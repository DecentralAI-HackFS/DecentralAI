import json
import pickle
from json import JSONDecodeError

from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID

from extensions.ext_database import db
from models.account import Account
from models.model import App, UploadFile

class Dataset(db.Model):
    __tablename__ = 'datasets'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='dataset_pkey'),
        db.Index('dataset_tenant_idx', 'tenant_id'),
    )

    INDEXING_TECHNIQUE_LIST = ['high_quality', 'economy']

    id = db.Column(UUID, server_default=db.text('uuid_generate_v4()'))
    tenant_id = db.Column(UUID, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    provider = db.Column(db.String(255), nullable=False,
                         server_default=db.text("'vendor'::character varying"))
    permission = db.Column(db.String(255), nullable=False,
                           server_default=db.text("'only_me'::character varying"))
    data_source_type = db.Column(db.String(255))
    indexing_technique = db.Column(db.String(255), nullable=True)
    index_struct = db.Column(db.Text, nullable=True)
    created_by = db.Column(UUID, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))
    updated_by = db.Column(UUID, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))

    @property
    def dataset_keyword_table(self):
        dataset_keyword_table = db.session.query(DatasetKeywordTable).filter(
            DatasetKeywordTable.dataset_id == self.id).first()
        if dataset_keyword_table:
            return dataset_keyword_table

        return None

    @property
    def index_struct_dict(self):
        return json.loads(self.index_struct) if self.index_struct else None

    @property
    def created_by_account(self):
        return Account.query.get(self.created_by)

    @property
    def latest_process_rule(self):
        return DatasetProcessRule.query.filter(DatasetProcessRule.dataset_id == self.id) \
            .order_by(DatasetProcessRule.created_at.desc()).first()

    @property
    def app_count(self):
        return db.session.query(func.count(AppDatasetJoin.id)).filter(AppDatasetJoin.dataset_id == self.id).scalar()

    @property
    def document_count(self):
        return db.session.query(func.count(Document.id)).filter(Document.dataset_id == self.id).scalar()

    @property
    def word_count(self):
        return Document.query.with_entities(func.coalesce(func.sum(Document.word_count))) \
            .filter(Document.dataset_id == self.id).scalar()


class DatasetProcessRule(db.Model):
    __tablename__ = 'dataset_process_rules'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='dataset_process_rule_pkey'),
        db.Index('dataset_process_rule_dataset_id_idx', 'dataset_id'),
    )

    id = db.Column(UUID, nullable=False,
                   server_default=db.text('uuid_generate_v4()'))
    dataset_id = db.Column(UUID, nullable=False)
    mode = db.Column(db.String(255), nullable=False,
                     server_default=db.text("'automatic'::character varying"))
    rules = db.Column(db.Text, nullable=True)
    created_by = db.Column(UUID, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))

    MODES = ['automatic', 'custom']
    PRE_PROCESSING_RULES = ['remove_stopwords', 'remove_extra_spaces', 'remove_urls_emails']
    AUTOMATIC_RULES = {
        'pre_processing_rules': [
            {'id': 'remove_extra_spaces', 'enabled': True},
            {'id': 'remove_urls_emails', 'enabled': False}
        ],
        'segmentation': {
            'delimiter': '\n',
            'max_tokens': 1000
        }
    }

    def to_dict(self):
        return {
            'id': self.id,
            'dataset_id': self.dataset_id,
            'mode': self.mode,
            'rules': self.rules_dict,
            'created_by': self.created_by,
            'created_at': self.created_at,
        }

    @property
    def rules_dict(self):
        try:
            return json.loads(self.rules) if self.rules else None
        except JSONDecodeError:
            return None


class Document(db.Model):
    __tablename__ = 'documents'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='document_pkey'),
        db.Index('document_dataset_id_idx', 'dataset_id'),
        db.Index('document_is_paused_idx', 'is_paused'),
    )

    # initial fields
    id = db.Column(UUID, nullable=False,
                   server_default=db.text('uuid_generate_v4()'))
    tenant_id = db.Column(UUID, nullable=False)
    dataset_id = db.Column(UUID, nullable=False)
    position = db.Column(db.Integer, nullable=False)
    data_source_type = db.Column(db.String(255), nullable=False)
    data_source_info = db.Column(db.Text, nullable=True)
    dataset_process_rule_id = db.Column(UUID, nullable=True)
    batch = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    created_from = db.Column(db.String(255), nullable=False)
    created_by = db.Column(UUID, nullable=False)
    created_api_request_id = db.Column(UUID, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))

    # start processing
    processing_started_at = db.Column(db.DateTime, nullable=True)

    # parsing
    file_id = db.Column(db.Text, nullable=True)
    word_count = db.Column(db.Integer, nullable=True)
    parsing_completed_at = db.Column(db.DateTime, nullable=True)

    # cleaning
    cleaning_completed_at = db.Column(db.DateTime, nullable=True)

    # split
    splitting_completed_at = db.Column(db.DateTime, nullable=True)

    # indexing
    tokens = db.Column(db.Integer, nullable=True)
    indexing_latency = db.Column(db.Float, nullable=True)
    completed_at = db.Column(db.DateTime, nullable=True)

    # pause
    is_paused = db.Column(db.Boolean, nullable=True, server_default=db.text('false'))
    paused_by = db.Column(UUID, nullable=True)
    paused_at = db.Column(db.DateTime, nullable=True)

    # error
    error = db.Column(db.Text, nullable=True)
    stopped_at = db.Column(db.DateTime, nullable=True)

    # basic fields
    indexing_status = db.Column(db.String(
        255), nullable=False, server_default=db.text("'waiting'::character varying"))
    enabled = db.Column(db.Boolean, nullable=False,
                        server_default=db.text('true'))
    disabled_at = db.Column(db.DateTime, nullable=True)
    disabled_by = db.Column(UUID, nullable=True)
    archived = db.Column(db.Boolean, nullable=False,
                         server_default=db.text('false'))
    archived_reason = db.Column(db.String(255), nullable=True)
    archived_by = db.Column(UUID, nullable=True)
    archived_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))
    doc_type = db.Column(db.String(40), nullable=True)
    doc_metadata = db.Column(db.JSON, nullable=True)

    DATA_SOURCES = ['upload_file']

    @property
    def display_status(self):
        status = None
        if self.indexing_status == 'waiting':
            status = 'queuing'
        elif self.indexing_status not in ['completed', 'error', 'waiting'] and self.is_paused:
            status = 'paused'
        elif self.indexing_status in ['parsing', 'cleaning', 'splitting', 'indexing']:
            status = 'indexing'
        elif self.indexing_status == 'error':
            status = 'error'
        elif self.indexing_status == 'completed' and not self.archived and self.enabled:
            status = 'available'
        elif self.indexing_status == 'completed' and not self.archived and not self.enabled:
            status = 'disabled'
        elif self.indexing_status == 'completed' and self.archived:
            status = 'archived'
        return status

    @property
    def data_source_info_dict(self):
        if self.data_source_info:
            try:
                data_source_info_dict = json.loads(self.data_source_info)
            except JSONDecodeError:
                data_source_info_dict = {}

            return data_source_info_dict
        return None

    @property
    def data_source_detail_dict(self):
        if self.data_source_info:
            if self.data_source_type == 'upload_file':
                data_source_info_dict = json.loads(self.data_source_info)
                file_detail = db.session.query(UploadFile). \
                    filter(UploadFile.id == data_source_info_dict['upload_file_id']). \
                    one_or_none()
                if file_detail:
                    return {
                        'upload_file': {
                            'id': file_detail.id,
                            'name': file_detail.name,
                            'size': file_detail.size,
                            'extension': file_detail.extension,
                            'mime_type': file_detail.mime_type,
                            'created_by': file_detail.created_by,
                            'created_at': file_detail.created_at.timestamp()
                        }
                    }
        return {}

    @property
    def average_segment_length(self):
        if self.word_count and self.word_count != 0 and self.segment_count and self.segment_count != 0:
            return self.word_count//self.segment_count
        return 0

    @property
    def dataset_process_rule(self):
        if self.dataset_process_rule_id:
            return DatasetProcessRule.query.get(self.dataset_process_rule_id)
        return None

    @property
    def dataset(self):
        return Dataset.query.get(self.dataset_id)

    @property
    def segment_count(self):
        return DocumentSegment.query.filter(DocumentSegment.document_id == self.id).count()

    @property
    def hit_count(self):
        return DocumentSegment.query.with_entities(func.coalesce(func.sum(DocumentSegment.hit_count))) \
            .filter(DocumentSegment.document_id == self.id).scalar()


class DocumentSegment(db.Model):
    __tablename__ = 'document_segments'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='document_segment_pkey'),
        db.Index('document_segment_dataset_id_idx', 'dataset_id'),
        db.Index('document_segment_document_id_idx', 'document_id'),
        db.Index('document_segment_tenant_dataset_idx', 'dataset_id', 'tenant_id'),
        db.Index('document_segment_tenant_document_idx', 'document_id', 'tenant_id'),
        db.Index('document_segment_dataset_node_idx', 'dataset_id', 'index_node_id'),
    )

    # initial fields
    id = db.Column(UUID, nullable=False,
                   server_default=db.text('uuid_generate_v4()'))
    tenant_id = db.Column(UUID, nullable=False)
    dataset_id = db.Column(UUID, nullable=False)
    document_id = db.Column(UUID, nullable=False)
    position = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    word_count = db.Column(db.Integer, nullable=False)
    tokens = db.Column(db.Integer, nullable=False)

    # indexing fields
    keywords = db.Column(db.JSON, nullable=True)
    index_node_id = db.Column(db.String(255), nullable=True)
    index_node_hash = db.Column(db.String(255), nullable=True)

    # basic fields
    hit_count = db.Column(db.Integer, nullable=False, default=0)
    enabled = db.Column(db.Boolean, nullable=False,
                        server_default=db.text('true'))
    disabled_at = db.Column(db.DateTime, nullable=True)
    disabled_by = db.Column(UUID, nullable=True)
    status = db.Column(db.String(255), nullable=False,
                       server_default=db.text("'waiting'::character varying"))
    created_by = db.Column(UUID, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=db.text('CURRENT_TIMESTAMP(0)'))
    indexing_at = db.Column(db.DateTime, nullable=True)
    completed_at = db.Column(db.DateTime, nullable=True)
    error = db.Column(db.Text, nullable=True)
    stopped_at = db.Column(db.DateTime, nullable=True)

    @property
    def dataset(self):
        return db.session.query(Dataset).filter(Dataset.id == self.dataset_id).first()

    @property
    def document(self):
        return db.session.query(Document).filter(Document.id == self.document_id).first()

    @property
    def embedding(self):
        embedding = db.session.query(Embedding).filter(Embedding.hash == self.index_node_hash).first() \
            if self.index_node_hash else None

        if embedding:
            return embedding.embedding

        return None

    @property
    def previous_segment(self):
        return db.session.query(DocumentSegment).filter(
            DocumentSegment.document_id == self.document_id,
            DocumentSegment.position == self.position - 1
        ).first()

    @property
    def next_segment(self):
        return db.session.query(DocumentSegment).filter(
            DocumentSegment.document_id == self.document_id,
            DocumentSegment.position == self.position + 1
        ).first()


class AppDatasetJoin(db.Model):
    __tablename__ = 'app_dataset_joins'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='app_dataset_join_pkey'),
        db.Index('app_dataset_join_app_dataset_idx', 'dataset_id', 'app_id'),
    )

    id = db.Column(UUID, primary_key=True, nullable=False, server_default=db.text('uuid_generate_v4()'))
    app_id = db.Column(UUID, nullable=False)
    dataset_id = db.Column(UUID, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.current_timestamp())

    @property
    def app(self):
        return App.query.get(self.app_id)


class DatasetQuery(db.Model):
    __tablename__ = 'dataset_queries'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='dataset_query_pkey'),
        db.Index('dataset_query_dataset_id_idx', 'dataset_id'),
    )

    id = db.Column(UUID, primary_key=True, nullable=False, server_default=db.text('uuid_generate_v4()'))
    dataset_id = db.Column(UUID, nullable=False)
    content = db.Column(db.Text, nullable=False)
    source = db.Column(db.String(255), nullable=False)
    source_app_id = db.Column(UUID, nullable=True)
    created_by_role = db.Column(db.String, nullable=False)
    created_by = db.Column(UUID, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.current_timestamp())


class DatasetKeywordTable(db.Model):
    __tablename__ = 'dataset_keyword_tables'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='dataset_keyword_table_pkey'),
        db.Index('dataset_keyword_table_dataset_id_idx', 'dataset_id'),
    )

    id = db.Column(UUID, primary_key=True, server_default=db.text('uuid_generate_v4()'))
    dataset_id = db.Column(UUID, nullable=False, unique=True)
    keyword_table = db.Column(db.Text, nullable=False)

    @property
    def keyword_table_dict(self):
        return json.loads(self.keyword_table) if self.keyword_table else None


class Embedding(db.Model):
    __tablename__ = 'embeddings'
    __table_args__ = (
        db.PrimaryKeyConstraint('id', name='embedding_pkey'),
        db.UniqueConstraint('hash', name='embedding_hash_idx')
    )

    id = db.Column(UUID, primary_key=True, server_default=db.text('uuid_generate_v4()'))
    hash = db.Column(db.String(64), nullable=False)
    embedding = db.Column(db.LargeBinary, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.text('CURRENT_TIMESTAMP(0)'))

    def set_embedding(self, embedding_data: list[float]):
        self.embedding = pickle.dumps(embedding_data, protocol=pickle.HIGHEST_PROTOCOL)

    def get_embedding(self) -> list[float]:
        return pickle.loads(self.embedding)

import os
import shutil
from contextlib import closing
import requests

import boto3
from botocore.exceptions import ClientError
from flask import Flask


class Storage:
    def __init__(self):
        self.storage_type = None
        self.bucket_name = None
        self.client = None
        self.folder = None
        self.web3_storage_api_key = None
        self.web3_storage_api = 'https://api.web3.storage'
        self.web3_storage_gateway = 'https://w3s.link'

    def init_app(self, app: Flask):
        self.storage_type = app.config.get('STORAGE_TYPE')
        # if self.storage_type == 's3':
        self.bucket_name = app.config.get('S3_BUCKET_NAME')
        self.client = boto3.client(
            's3',
            aws_secret_access_key=app.config.get('S3_SECRET_KEY'),
            aws_access_key_id=app.config.get('S3_ACCESS_KEY'),
            endpoint_url=app.config.get('S3_ENDPOINT'),
            region_name=app.config.get('S3_REGION')
        )
        # if self.storage_type == 'web3.storage':
        self.web3_storage_api_key = app.config.get('WEB3_STORAGE_API_KEY')
        # else:
        self.folder = app.config.get('STORAGE_LOCAL_PATH')
        if not os.path.isabs(self.folder):
            self.folder = os.path.join(app.root_path, self.folder)

    def save(self, filename, data, storage_type=None):
        if storage_type:
            current_storage_type = storage_type
        else:
            current_storage_type = self.storage_type
        if current_storage_type == 's3':
            self.client.put_object(Bucket=self.bucket_name, Key=filename, Body=data)
        if current_storage_type == 'web3.storage':
            response = requests.post(
                url=self.web3_storage_api + '/upload',
                data=data,
                headers={'Authorization': 'Bearer ' + self.web3_storage_api_key}
            )
            return response.json()['cid']
        else:
            if not self.folder or self.folder.endswith('/'):
                filename = self.folder + filename
            else:
                filename = self.folder + '/' + filename

            folder = os.path.dirname(filename)
            os.makedirs(folder, exist_ok=True)

            with open(os.path.join(os.getcwd(), filename), "wb") as f:
                f.write(data)
        return None

    def load(self, filename, storage_type=None):
        if storage_type:
            current_storage_type = storage_type
        else:
            current_storage_type = self.storage_type

        if current_storage_type == 's3':
            try:
                with closing(self.client) as client:
                    data = client.get_object(Bucket=self.bucket_name, Key=filename)['Body'].read()
            except ClientError as ex:
                if ex.response['Error']['Code'] == 'NoSuchKey':
                    raise FileNotFoundError("File not found")
                else:
                    raise
        if current_storage_type == 'web3.storage':
            # filename is cid
            response = requests.get(url=self.web3_storage_gateway + '/ipfs/' + filename)
            if response.status_code == 200:
                data = response.content
            else:
                raise FileNotFoundError("File not found")
        else:
            if not self.folder or self.folder.endswith('/'):
                filename = self.folder + filename
            else:
                filename = self.folder + '/' + filename

            if not os.path.exists(filename):
                raise FileNotFoundError("File not found")

            with open(filename, "rb") as f:
                data = f.read()

        return data

    def download(self, filename, target_filepath, storage_type=None):
        if storage_type:
            current_storage_type = storage_type
        else:
            current_storage_type = self.storage_type

        if current_storage_type == 's3':
            with closing(self.client) as client:
                client.download_file(self.bucket_name, filename, target_filepath)
        if current_storage_type == 'web3.storage':
            with open(target_filepath, 'wb') as f:
                # filename is cid
                response = requests.get(self.web3_storage_gateway + '/ipfs/' + filename)
                f.write(response.content)
        else:
            if not self.folder or self.folder.endswith('/'):
                filename = self.folder + filename
            else:
                filename = self.folder + '/' + filename

            if not os.path.exists(filename):
                raise FileNotFoundError("File not found")

            shutil.copyfile(filename, target_filepath)

    def exists(self, filename, storage_type=None):
        if storage_type:
            current_storage_type = storage_type
        else:
            current_storage_type = self.storage_type

        if current_storage_type == 's3':
            with closing(self.client) as client:
                try:
                    client.head_object(Bucket=self.bucket_name, Key=filename)
                    return True
                except:
                    return False
        if current_storage_type == 'web3.storage':
            # filename is cid
            response = requests.get(url=self.web3_storage_gateway + '/ipfs/' + filename)
            if response.status_code == 200:
                return True
            else:
                return False
        else:
            if not self.folder or self.folder.endswith('/'):
                filename = self.folder + filename
            else:
                filename = self.folder + '/' + filename

            return os.path.exists(filename)


storage = Storage()


def init_app(app: Flask):
    storage.init_app(app)

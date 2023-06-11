'use client'
import React, { useState, FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { fetchTestingRecords } from '@/service/datasets'
import { omit } from 'lodash-es'
import Pagination from '@/app/components/base/pagination'
import Modal from '@/app/components/base/modal'
import Loading from '@/app/components/base/loading'
import type { HitTestingResponse, HitTesting } from '@/models/datasets'
import cn from 'classnames'
import dayjs from 'dayjs'
import SegmentCard from '../documents/detail/completed/SegmentCard'
import docStyle from '../documents/detail/completed/style.module.css'
import Textarea from './textarea'
import s from './style.module.css'
import HitDetail from './hit-detail'

const limit = 10;

type Props = {
  datasetId: string
}

const RecordsEmpty: FC = () => {
  const { t } = useTranslation()
  return <div className='bg-gray-50 rounded-2xl p-5'>
    <div className={s.clockWrapper}>
      <div className={cn(s.clockIcon, 'w-5 h-5')}></div>
    </div>
    <div className='my-2 text-gray-500 text-sm'>{t('datasetHitTesting.noRecentTip')}</div>
  </div>
}

const HitTesting: FC<Props> = ({ datasetId }: Props) => {
  const { t } = useTranslation()
  const [hitResult, setHitResult] = useState<HitTestingResponse | undefined>(); // 初始化记录为空数组
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currParagraph, setCurrParagraph] = useState<{ paraInfo?: HitTesting; showModal: boolean }>({ showModal: false })
  const [text, setText] = useState('');

  const [currPage, setCurrPage] = React.useState<number>(0)
  const { data: recordsRes, error, mutate: recordsMutate } = useSWR({
    action: 'fetchTestingRecords',
    datasetId,
    params: { limit, page: currPage + 1, }
  }, apiParams => fetchTestingRecords(omit(apiParams, 'action')))

  const total = recordsRes?.total || 0

  const points = useMemo(() => (hitResult?.records.map((v) => [v.tsne_position.x, v.tsne_position.y]) || []), [hitResult?.records])

  const onClickCard = (detail: HitTesting) => {
    setCurrParagraph({ paraInfo: detail, showModal: true })
  }

  return (
    <div className={s.container}>
      <div className={s.leftDiv}>
        <div className={s.titleWrapper}>
          <h1 className={s.title}>{t('datasetHitTesting.title')}</h1>
          <p className={s.desc}>{t('datasetHitTesting.desc')}</p>
        </div>
        <Textarea
          datasetId={datasetId}
          setHitResult={setHitResult}
          onUpdateList={recordsMutate}
          loading={submitLoading}
          setLoading={setSubmitLoading}
          setText={setText}
          text={text}
        />
        <div className={cn(s.title, 'mt-8 mb-2')}>{t('datasetHitTesting.recents')}</div>
        {!recordsRes && !error ? (
          <div className='flex-1'><Loading type='app' /></div>
        ) : recordsRes?.data?.length ? (
          <>
            <table className={`w-full border-collapse border-0 mt-3 ${s.table}`}>
              <thead className="h-8 leading-8 border-b border-gray-200 text-gray-500 font-bold">
                <tr>
                  <td className='w-28'>{t('datasetHitTesting.table.header.source')}</td>
                  <td>{t('datasetHitTesting.table.header.text')}</td>
                  <td className='w-48'>{t('datasetHitTesting.table.header.time')}</td>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {recordsRes?.data?.map((record) => {
                  return <tr
                    key={record.id}
                    className='group border-b border-gray-200 h-8 hover:bg-gray-50 cursor-pointer'
                    onClick={() => setText(record.content)}
                  >
                    <td className='w-24'>
                      <div className='flex items-center'>
                        <div className={cn(s[`${record.source}_icon`], s.commonIcon, 'mr-1')} />
                        <span className='capitalize'>{record.source.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className='max-w-xs group-hover:text-primary-600'>{record.content}</td>
                    <td className='w-36'>
                      {dayjs.unix(record.created_at).format(t('datasetHitTesting.dateTimeFormat') as string)}
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
            {(total && total > limit)
              ? <Pagination current={currPage} onChange={setCurrPage} total={total} limit={limit} />
              : null}
          </>
        ) : (
          <RecordsEmpty />
        )}
      </div>
      <div className={s.rightDiv}>
        {submitLoading ?
          <div className={s.cardWrapper}>
            <SegmentCard
              loading={true}
              scene='hitTesting'
              className='h-[216px]'
            />
            <SegmentCard
              loading={true}
              scene='hitTesting'
              className='h-[216px]'
            />
          </div> : !hitResult?.records.length ? (
            <div className='h-full flex flex-col justify-center items-center'>
              <div className={cn(docStyle.commonIcon, docStyle.targetIcon, '!bg-gray-200 !h-14 !w-14')} />
              <div className='text-gray-300 text-[13px] mt-3'>
                {t('datasetHitTesting.hit.emptyTip')}
              </div>
            </div>
          ) : (
            <>
              <div className='text-gray-600 font-semibold mb-4'>{t('datasetHitTesting.hit.title')}</div>
              <div className='overflow-auto flex-1'>
                <div className={s.cardWrapper}>
                  {hitResult?.records.map((record) => {
                    return <SegmentCard
                      loading={false}
                      detail={record.segment as any}
                      score={record.score}
                      scene='hitTesting'
                      className='h-[216px] mb-4'
                      onClick={() => onClickCard(record as any)}
                    />
                  })}
                </div>
              </div>
            </>
          )
        }
      </div>
      <Modal
        className='!max-w-[960px] !p-0'
        closable
        onClose={() => setCurrParagraph({ showModal: false })}
        isShow={currParagraph.showModal}
      >
        {currParagraph.showModal && <HitDetail
          segInfo={currParagraph.paraInfo?.segment}
          vectorInfo={{
            curr: [[currParagraph.paraInfo?.tsne_position?.x || 0, currParagraph.paraInfo?.tsne_position.y || 0]],
            points,
          }}
        />}
      </Modal>
    </div>
  )
}

export default HitTesting

import DatasetUpdateForm from '@/app/decentral-ai/components/datasets/create'
import React from 'react'

export type IProps = {
  params: { datasetId: string }
}

const Create = async ({
  params: { datasetId },
}: IProps) => {
  return (
    <DatasetUpdateForm datasetId={datasetId} />
  )
}

export default Create

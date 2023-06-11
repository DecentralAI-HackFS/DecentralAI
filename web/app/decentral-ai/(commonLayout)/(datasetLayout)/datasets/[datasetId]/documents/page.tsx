import React from 'react'
import Main from '@/app/decentral-ai/components/datasets/documents'

export type IProps = {
  params: { datasetId: string }
}

const Documents = async ({
  params: { datasetId },
}: IProps) => {
  return (
    <Main datasetId={datasetId} />
  )
}

export default Documents

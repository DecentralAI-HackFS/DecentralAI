'use client'

import { forwardRef } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import style from '../list.module.css'

const CreateAppCard = forwardRef<HTMLAnchorElement>((_, ref) => {
  const { t } = useTranslation()

  return (
    <a ref={ref} className={classNames(style.listItem, style.newItemCard)} href='/decentral-ai/datasets/create'>
      <div className={style.listItemTitle}>
        <span className={style.newItemIcon}>
          <span className={classNames(style.newItemIconImage, style.newItemIconAdd)} />
        </span>
        <div className={classNames(style.listItemHeading, style.newItemCardHeading)}>
          {t('dataset.createDataset')}
        </div>
      </div>
      <div className={style.listItemDescription}>{t('dataset.createDatasetIntro')}</div>
    </a>
  )
})

export default CreateAppCard

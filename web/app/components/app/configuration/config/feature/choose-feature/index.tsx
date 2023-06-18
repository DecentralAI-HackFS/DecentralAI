'use client'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '@/app/components/base/modal'
import FeatureItem from './feature-item'
import FeatureGroup from '../feature-group'
import MoreLikeThisIcon from '../../../base/icons/more-like-this-icon'
import SuggestedQuestionsAfterAnswerIcon from '@/app/components/app/configuration/base/icons/suggested-questions-after-answer-icon'

interface IConfig {
  openingStatement: boolean
  moreLikeThis: boolean
  suggestedQuestionsAfterAnswer: boolean
}

export interface IChooseFeatureProps {
  isShow: boolean
  onClose: () => void
  config: IConfig
  isChatApp: boolean
  onChange: (key: string, value: boolean) => void
}

const OpeningStatementIcon = (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.33328 0.333252C4.83548 0.333252 1.99995 3.16878 1.99995 6.66659C1.99995 7.37325 2.11594 8.05419 2.33045 8.6906C2.36818 8.80254 2.39039 8.86877 2.40482 8.91762L2.40955 8.93407L2.40705 8.93928C2.38991 8.97462 2.36444 9.02207 2.31681 9.11025L1.21555 11.1486C1.1473 11.2749 1.07608 11.4066 1.02711 11.5212C0.978424 11.6351 0.899569 11.844 0.938369 12.0916C0.98385 12.3819 1.15471 12.6375 1.40556 12.7905C1.61957 12.9211 1.84276 12.9281 1.96659 12.9267C2.09117 12.9252 2.24012 12.9098 2.3829 12.895L5.81954 12.5397C5.87458 12.534 5.90335 12.5311 5.92443 12.5295L5.92715 12.5293L5.93539 12.5322C5.96129 12.5415 5.99642 12.555 6.05705 12.5784C6.76435 12.8509 7.53219 12.9999 8.33328 12.9999C11.8311 12.9999 14.6666 10.1644 14.6666 6.66659C14.6666 3.16878 11.8311 0.333252 8.33328 0.333252ZM5.97966 4.7214C6.73118 4.08722 7.73139 4.27352 8.3312 4.96609C8.931 4.27352 9.9183 4.09389 10.6827 4.7214C11.4472 5.34892 11.5401 6.41591 10.9499 7.16596C10.5843 7.63065 9.66655 8.47935 9.02117 9.05789C8.78411 9.2704 8.66558 9.37666 8.52332 9.41947C8.40129 9.4562 8.2611 9.4562 8.13907 9.41947C7.99682 9.37666 7.87829 9.2704 7.64122 9.05789C6.99584 8.47935 6.07814 7.63065 5.71251 7.16596C5.12234 6.41591 5.22815 5.35559 5.97966 4.7214Z" fill="#DD2590" />
  </svg>
)

const ChooseFeature: FC<IChooseFeatureProps> = ({
  isShow,
  onClose,
  isChatApp,
  config,
  onChange
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      isShow={isShow}
      onClose={onClose}
      className='w-[400px]'
      title={t('appDebug.operation.addFeature')}
      closable
    >
      <div className='pt-5 pb-10'>
        {/* Chat Feature */}
        {isChatApp && (
          <FeatureGroup
            title={t('appDebug.feature.groupChat.title')}
            description={t('appDebug.feature.groupChat.description') as string}
          >
            <>
              <FeatureItem
                icon={OpeningStatementIcon}
                title={t('appDebug.feature.conversationOpener.title')}
                description={t('appDebug.feature.conversationOpener.description')}
                value={config.openingStatement}
                onChange={(value) => onChange('openingStatement', value)}
              />
              <FeatureItem
                icon={<SuggestedQuestionsAfterAnswerIcon />}
                title={t('appDebug.feature.suggestedQuestionsAfterAnswer.title')}
                description={t('appDebug.feature.suggestedQuestionsAfterAnswer.description')}
                value={config.suggestedQuestionsAfterAnswer}
                onChange={(value) => onChange('suggestedQuestionsAfterAnswer', value)}
              />
            </>
          </FeatureGroup>
        )}

        {/* Text Generation Feature */}
        {!isChatApp && (
          <FeatureGroup title={t('appDebug.feature.groupExperience.title')}>
            <>
              <FeatureItem
                icon={<MoreLikeThisIcon />}
                title={t('appDebug.feature.moreLikeThis.title')}
                description={t('appDebug.feature.moreLikeThis.description')}
                value={config.moreLikeThis}
                onChange={(value) => onChange('moreLikeThis', value)}
              />
            </>
          </FeatureGroup>
        )}
      </div>

    </Modal>
  )
}
export default React.memo(ChooseFeature)

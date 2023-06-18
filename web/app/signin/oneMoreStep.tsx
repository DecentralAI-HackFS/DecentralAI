'use client'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/base/button'
import Tooltip from '@/app/components/base/tooltip/index'

import { SimpleSelect } from '@/app/components/base/select'
import { timezones } from '@/utils/timezone'
import { languageMaps, languages } from '@/utils/language'
import { oneMoreStep } from '@/service/common'
import Toast from '@/app/components/base/toast'

type IState = {
  formState: 'processing' | 'error' | 'success' | 'initial'
  invitation_code: string
  interface_language: string
  timezone: string
}

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'invitation_code':
      return { ...state, invitation_code: action.value }
    case 'interface_language':
      return { ...state, interface_language: action.value }
    case 'timezone':
      return { ...state, timezone: action.value }
    case 'formState':
      return { ...state, formState: action.value }
    case 'failed':
      return {
        formState: 'initial',
        invitation_code: '',
        interface_language: 'en-US',
        timezone: 'Asia/Shanghai',
      }
    default:
      throw new Error('Unknown action.')
  }
}

const OneMoreStep = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, {
    formState: 'initial',
    invitation_code: '',
    interface_language: 'en-US',
    timezone: 'Asia/Shanghai',
  })
  const { data, error } = useSWR(state.formState === 'processing'
    ? {
      url: '/account/init',
      body: {
        invitation_code: state.invitation_code,
        interface_language: state.interface_language,
        timezone: state.timezone,
      },
    }
    : null, oneMoreStep)

  useEffect(() => {
    if (error && error.status === 400) {
      Toast.notify({ type: 'error', message: t('login.invalidInvitationCode') })
      dispatch({ type: 'failed', payload: null })
    }
    if (data)
      router.push('/apps')
  }, [data, error])

  return (
    <>
      <div className="w-full mx-auto">
        <h2 className="text-3xl font-normal text-gray-900">{t('login.oneMoreStep')}</h2>
        <p className='mt-2 text-sm text-gray-600 '>{t('login.createSample')}</p>
      </div>

      <div className="w-full mx-auto mt-8">
        <div className="space-y-6 bg-white">
          <div className="">
            <label className="flex items-center justify-between text-sm font-medium text-gray-900">
              {t('login.invitationCode')}
              <Tooltip
                clickable
                selector='dont-have'
                htmlContent={
                  <div className='w-[256px] text-xs font-medium'>
                    <div className='font-medium'>{t('login.sendUsMail')}</div>
                    <div className='text-xs font-medium cursor-pointer text-primary-600'>
                      <a href="mailto:request-invitation@langgenius.ai">request-invitation@langgenius.ai</a>
                    </div>
                  </div>
                }
              >
                <span className='cursor-pointer text-primary-600'>{t('login.donthave')}</span>
              </Tooltip>
            </label>
            <div className="mt-1">
              <input
                id="invitation_code"
                value={state.invitation_code}
                type="text"
                className={'appearance-none block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 rounded-md shadow-sm placeholder-gray-400 sm:text-sm'}
                onChange={(e) => {
                  dispatch({ type: 'invitation_code', value: e.target.value.trim() })
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('login.interfaceLanguage')}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <SimpleSelect
                defaultValue={languageMaps.en}
                items={languages}
                onSelect={(item) => {
                  dispatch({ type: 'interface_language', value: item.value })
                }}
              />
            </div>
          </div>
          <div>

            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              {t('login.timezone')}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <SimpleSelect
                defaultValue={state.timezone}
                items={timezones}
                onSelect={(item) => {
                  dispatch({ type: 'timezone', value: item.value })
                }}
              />
            </div>
          </div>
          <div>
            <Button
              type='primary'
              disabled={state.formState === 'processing'}
              onClick={() => {
                dispatch({ type: 'formState', value: 'processing' })
              }}
            >
              {t('login.go')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneMoreStep

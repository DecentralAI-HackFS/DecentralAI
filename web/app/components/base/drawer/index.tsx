'use client'
import { Dialog } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Button from '../button'

type DrawerProps = {
  title?: string
  description?: string
  panelClassname?: string
  children: React.ReactNode
  footer?: React.ReactNode
  mask?: boolean
  isOpen: boolean
  // closable: boolean
  onClose: () => void
  onCancel?: () => void
  onOk?: () => void
}

export default function Drawer({
  title = '',
  description = '',
  panelClassname = '',
  children,
  footer,
  mask = true,
  isOpen,
  onClose,
  onCancel,
  onOk,
}: DrawerProps) {
  const { t } = useTranslation()
  return (
    <Dialog
      unmount={false}
      open={isOpen}
      onClose={() => onClose()}
      className="fixed z-30 inset-0 overflow-y-auto"
    >
      <div className="flex w-screen h-screen justify-end">
        {/* mask */}
        <Dialog.Overlay
          className={`z-40 fixed inset-0 ${!mask ? '' : 'bg-black bg-opacity-30'}`}
        />
        <div className={`z-50 flex flex-col justify-between bg-white w-full
        max-w-sm p-6 overflow-hidden text-left align-middle
        shadow-xl ${panelClassname}`}>
          <>
            {title && <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </Dialog.Title>}
            {description && <Dialog.Description className='text-gray-500 text-xs font-normal mt-2'>{description}</Dialog.Description>}
            {children}
          </>
          {footer || (footer === null
            ? null
            : <div className="mt-10 flex flex-row justify-end">
              <Button
                className='mr-2'
                onClick={() => {
                  onCancel && onCancel()
                }}>{t('common.operation.cancel')}</Button>
              <Button
                onClick={() => {
                  onOk && onOk()
                }}>{t('common.operation.save')}</Button>
            </div>)}
        </div>
      </div>
    </Dialog>
  )
}

import React, { useCallback, useRef } from 'react'
import { IToastProps, useToast as useNativeToast } from 'native-base'

import ToastContent from '../Components/ToastContent'

export enum ToastTypes {
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export interface ToastProps extends IToastProps {
  type?: ToastTypes
  description?: string
  showClose?: boolean
  p?: number
}

export default function useToast() {
  const toast = useNativeToast()
  const toastIdRef = useRef()

  const close = useCallback(() => {
    if (toastIdRef?.current) {
      toast.close(toastIdRef.current)
    }
  }, [toast])

  const closeAll = useCallback(() => {
    toast.closeAll()
  }, [toast])

  const showToast = useCallback(
    ({
      description,
      title,
      type = ToastTypes.success,
      duration = 6000,
      showClose = false,
      placement = 'bottom',
      p = 4,
    }: ToastProps) => {
      toastIdRef.current = toast.show({
        render: () => (
          <ToastContent
            type={type}
            title={title || ''}
            description={description || ''}
            close={close}
            showClose={showClose}
            p={p}
          />
        ),
        duration,
        placement,
      })
    },
    [close, toast],
  )

  return { showToast, closeAll }
}

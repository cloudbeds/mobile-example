import { useCallback, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

export function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = useRef(false)

  useFocusEffect(
    useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        if (enabledRef.current) {
          refetch()
        } else {
          enabledRef.current = true
        }
      })
    }, [refetch]),
  )
}

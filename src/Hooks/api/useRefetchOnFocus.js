import { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export function useRefreshOnFocus(refetch) {
  const enabledRef = useRef(false)

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch]),
  )
}

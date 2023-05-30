import { useEffect } from 'react'
import { AppState } from 'react-native'

export function useAppState(onChange) {
  useEffect(() => {
    if (AppState.addEventListener) {
      AppState.addEventListener('change', onChange)
    }

    return () => {
      if (AppState.removeEventListener) {
        AppState.removeEventListener('change', onChange)
      }
    }
  }, [onChange])
}

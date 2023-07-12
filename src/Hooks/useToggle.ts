import { useCallback, useState } from 'react'
import { Keyboard } from 'react-native'

export default function useToggle(): {
  isVisible: boolean
  modalClose: (action: any | null) => void
  toggle: [boolean, (val: boolean) => void]
} {
  const [isVisible, setIsVisible] = useState(true)
  const [toggle, setToggle] = useState(false)

  const changeToggle = useCallback((val: boolean) => {
    if (!val) {
      Keyboard.dismiss()
    }
    setToggle(val)
  }, [])

  const modalClose = useCallback(
    (action: any = null) => {
      Keyboard.dismiss()

      setIsVisible(false)

      action && action()
    },
    [setIsVisible],
  )

  return { isVisible, modalClose, toggle: [toggle, changeToggle] }
}

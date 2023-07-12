import React, { memo, useCallback, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AlertDialog, Button } from 'native-base'

import {
  ConfirmModalTypes,
  GenericNavigationProps,
  RouteProps,
} from '../../Navigation/types'
import { useToggle } from '../../Hooks'

interface Props {}

const ConfirmDialog: React.FC<Props> = ({}) => {
  const navigation = useNavigation<GenericNavigationProps>()
  const route = useRoute<RouteProps>()
  const { isVisible, modalClose } = useToggle()

  const onClose = route.params?.onClose
  const { title, description, confirmLabel, cancelLabel } = route.params
    ?.confirmParams as ConfirmModalTypes

  const closeConfirm = useCallback(
    (val: boolean) => () => {
      modalClose(() => navigation.goBack())
      onClose?.(val)
    },
    [modalClose, navigation, onClose],
  )

  const cancelRef = useRef(null)

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isVisible}
      onClose={closeConfirm(false)}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />

        <AlertDialog.Header borderBottomWidth={0} mt={4} mb={-4}>
          {title}
        </AlertDialog.Header>

        <AlertDialog.Body>{description}</AlertDialog.Body>

        <AlertDialog.Footer borderTopWidth={0}>
          <Button.Group space={2}>
            <Button
              variant="outline"
              colorScheme="coolGray"
              size={'sm'}
              onPress={closeConfirm(false)}
              ref={cancelRef}>
              {cancelLabel || 'Cancel'}
            </Button>

            <Button size={'sm'} onPress={closeConfirm(true)}>
              {confirmLabel || 'Confirm'}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default memo(ConfirmDialog)

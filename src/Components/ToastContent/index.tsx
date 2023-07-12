import React, { memo } from 'react'
import {
  Box,
  CloseIcon,
  HStack,
  IPressableProps,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCheck,
  faExclamationCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import { ToastTypes } from '../../Hooks/useToast'
import devices from '../../Theme/devices'

interface Props extends IPressableProps {
  type: ToastTypes
  description: string
  title?: any
  close?: () => void
  showClose?: boolean
}

const ToastContent: React.FC<Props> = ({
  type,
  description,
  title,
  close,
  showClose,
  ...props
}) => {
  const { colors } = useTheme()

  const bgColor =
    type === ToastTypes.success
      ? 'emerald.50'
      : type === ToastTypes.warning
      ? 'warning.50'
      : 'error.50'

  const textColor =
    type === ToastTypes.success
      ? 'emerald.600'
      : type === ToastTypes.warning
      ? 'warning.600'
      : 'error.600'

  const iconColor =
    type === ToastTypes.success
      ? colors.emerald['600']
      : type === ToastTypes.warning
      ? colors.warning['600']
      : colors.error['600']

  return (
    <Pressable
      p={4}
      width={devices.dimensions.width}
      {...props}
      onPress={close}>
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={4}
        rounded={'sm'}
        borderWidth={1}
        borderColor={textColor}
        bg={bgColor}>
        <HStack>
          <Box mt={0.5}>
            <FontAwesomeIcon
              icon={
                (type === ToastTypes.success
                  ? faCheck
                  : type === ToastTypes.warning
                  ? faExclamationCircle
                  : faExclamationTriangle) as Icon
              }
              size={14}
              color={iconColor}
            />
          </Box>

          <VStack ml={2} maxW={showClose ? '90%' : '92%'}>
            {title ? (
              <Text fontWeight={'700'} color={textColor} mb={1}>
                {title}
              </Text>
            ) : null}
            {description ? <Text color={textColor}>{description}</Text> : null}
          </VStack>
        </HStack>

        {showClose ? <CloseIcon color={colors.darkText} size={3.5} /> : null}
      </Box>
    </Pressable>
  )
}

export default memo(ToastContent)

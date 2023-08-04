import React, { memo, useCallback, useState } from 'react'
import {
  Box,
  HStack,
  IInputProps,
  Input,
  Pressable,
  Text,
  Tooltip,
  useTheme,
} from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

interface Props extends IInputProps {
  label?: string
  required?: boolean
  tooltip?: any
  mt?: number
  tooltipWidth?: any
  tooltipHeight?: any
}

const StyledInput: React.FC<Props> = ({
  label,
  required,
  tooltip,
  mt,
  tooltipWidth,
  tooltipHeight,
  ...props
}) => {
  const { colors } = useTheme()

  const [isOpen, setIsOpen] = useState(false)

  const onPress = useCallback(() => {
    if (tooltip) {
      setIsOpen(!isOpen)

      setTimeout(() => {
        setIsOpen(false)
      }, 10000)
    }
  }, [isOpen, tooltip])

  return (
    <Box mt={mt || 6}>
      {label && (
        <Tooltip
          label={tooltip}
          placement={'top'}
          bg={'info.600'}
          width={tooltipWidth || '90%'}
          height={tooltipHeight}
          p={3}
          isOpen={isOpen}
          onOpen={onPress}>
          <Pressable onPress={onPress}>
            <HStack space={2} alignItems={'center'}>
              <Text fontSize={16} fontWeight={'600'}>
                {label}
                {required ? (
                  <Text fontWeight={'600'} color={'error.500'}>
                    {' '}
                    *
                  </Text>
                ) : (
                  ''
                )}
              </Text>

              {tooltip && (
                <FontAwesomeIcon
                  icon={faQuestionCircle as Icon}
                  size={18}
                  color={colors.darkText}
                />
              )}
            </HStack>
          </Pressable>
        </Tooltip>
      )}

      <Input
        bg={'white'}
        _focus={{ backgroundColor: 'white' }}
        h={44}
        fontSize={16}
        mt={2}
        {...props}
      />
    </Box>
  )
}

export default memo(StyledInput)

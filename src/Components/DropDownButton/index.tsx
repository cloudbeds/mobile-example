import React, { memo } from 'react'
import { IPressableProps, Pressable, Text, VStack, useTheme } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

interface Props extends IPressableProps {
  label?: string
  required?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
}

const DropDownButton: React.FC<Props> = ({
  label,
  required,
  placeholder = 'Select...',
  value,
  disabled,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <Pressable
      w={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={4}
      py={2}
      borderRadius={'md'}
      borderColor={'info.500'}
      borderWidth={1}
      bg={disabled ? 'info.400' : 'white'}
      opacity={disabled ? 0.7 : 1}
      {...props}>
      <VStack>
        {label ? (
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
        ) : null}

        <Text
          fontSize={14}
          color={value ? 'primary.900' : 'primary.500'}
          mt={1}>
          {value || placeholder}
        </Text>
      </VStack>

      <FontAwesomeIcon
        icon={faChevronDown as Icon}
        size={14}
        color={value ? colors.primary['900'] : colors.primary['500']}
      />
    </Pressable>
  )
}

export default memo(DropDownButton)

import React from 'react'
import { HStack, Text, ChevronDownIcon, Pressable } from 'native-base'

interface Props {
  label: string
  value: string
  onPress: () => void
}

const FilterButton = ({ label, value, onPress }: Props) => {
  return (
    <Pressable
      py={1.5}
      px={3}
      bg="white"
      borderRadius={18}
      mb={2}
      onPress={onPress}>
      <HStack space={2} alignItems={'center'}>
        <Text fontSize={13} color="primary.600" maxWidth={'96%'}>
          {label}:{' '}
          <Text fontSize={13} color="primary.600" bold>
            {value}
          </Text>
        </Text>
        <ChevronDownIcon size={3} color="primary.400" />
      </HStack>
    </Pressable>
  )
}

export default FilterButton

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'

const SegmentButton = ({ label, onPress, selected }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      activeOpacity={0.5}>
      <Box
        py="2.5"
        px="8"
        bg={selected ? 'white' : undefined}
        shadow={selected ? '3' : undefined}
        borderRadius="3xl"
        alignItems="center"
        justifyContent="center">
        <Text
          size="md"
          fontWeight={selected ? '600' : '500'}
          color={selected ? 'primary.500' : 'darkText'}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}

export default SegmentButton

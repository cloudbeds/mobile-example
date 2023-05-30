import React from 'react'
import { Box, HStack, Spacer } from 'native-base'
import SegmentButton from './SegmentButton'

const SegmentToggle = ({ selected, onSelect }) => {
  return (
    <HStack
      p="4"
      bg="white"
      borderBottomWidth="1"
      borderBottomColor="light.300"
      justifyContent="center"
      alignItems="center">
      <Spacer />
      <Box
        py="1"
        px="2"
        bg="light.100"
        borderRadius="3xl"
        flexDirection="row"
        justifyContent="center">
        <SegmentButton
          label="Today"
          onPress={() => onSelect('Today')}
          selected={selected === 'Today'}
        />
        <SegmentButton
          label="Tomorrow"
          onPress={() => onSelect('Tomorrow')}
          selected={selected === 'Tomorrow'}
        />
      </Box>
      <Spacer />
    </HStack>
  )
}

export default SegmentToggle

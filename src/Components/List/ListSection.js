import { Box, Text } from 'native-base'
import React from 'react'

const ListSection = ({ children }) => {
  return (
    <Box px="4" py="2" bg="light.600">
      <Text size="xs" fontWeight="600" color="white">
        {children}
      </Text>
    </Box>
  )
}

export default ListSection

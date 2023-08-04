import React from 'react'
import { Box, Text } from 'native-base'

interface Props {
  children: any
}

const ListSection = ({ children }: Props) => {
  return (
    <Box px="4" py="2" bg="light.600">
      <Text size="xs" fontWeight="600" color="white">
        {children}
      </Text>
    </Box>
  )
}

export default ListSection

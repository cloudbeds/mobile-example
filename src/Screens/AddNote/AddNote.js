import React from 'react'
import { Box, Text } from 'native-base'
import Hero from '../../Components/Hero/Hero'

function AddNote({ navigation }) {
  return (
    <Box style={{  }}>
      <Hero image>
        <Text color="white" textAlign="center" size="lg" fontWeight="600" p="4">
          Add Note
        </Text>
      </Hero>
      <Box py="5">
        <Text textAlign="center">Coming Soon!</Text>
      </Box>
    </Box>
  )
}

export default AddNote

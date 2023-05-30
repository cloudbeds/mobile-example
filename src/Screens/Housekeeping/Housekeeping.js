import React from 'react'
import { Box, Text } from 'native-base'
import ListSection from '../../Components/List/ListSection'
import Hero from '../../Components/Hero/Hero'

function Houskeeping({ navigation }) {
  return (
    <Box>
      <Hero image>
        <Text color="white" textAlign="center" size="lg" fontWeight="600" p="4">
          Housekeeping
        </Text>
      </Hero>
      <ListSection>Rooms</ListSection>
      <Box py="5">
        <Text textAlign="center">Coming Soon!</Text>
      </Box>
    </Box>
  )
}

export default Houskeeping

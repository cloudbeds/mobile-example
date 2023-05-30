import React from 'react'
import { Box, Text, Button, Spacer } from 'native-base'
import ListItem from '../../Components/List/ListItem'
import ListSection from '../../Components/List/ListSection'
import Hero from '../../Components/Hero/Hero'

import { useAuth } from '../../Hooks/AuthContext'
import { useUser } from '../../Hooks/UserContext'

function Settings({ navigation }) {
  const { currentProperty, properties } = useUser()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Box style={{ backgroundColor: 'white', flexGrow: 1 }}>
      <Hero image>
        <Text color="white" textAlign="center" size="lg" fontWeight="600" p="4">Settings</Text>
      </Hero>
      <ListSection>About</ListSection>
      <ListItem
        mt="4"
        borderBottomColor="light.100"
        leftContent={<Text size="sm">Version</Text>}
        rightContent={
          <Text size="sm" fontWeight="600">
            1.0.0
          </Text>
        }
      />
      <ListItem
        mt="4"
        borderBottomColor="light.100"
        leftContent={<Text size="sm">Property</Text>}
        onPress={properties.length > 1 && (() => navigation.navigate(''))}
        rightContent={
          <Text
            size="sm"
            fontWeight="600"
            numberOfLines={1}
            ellipsizeMode="tail">
            {currentProperty.propertyName}
          </Text>
        }
      />
      <ListItem
        mt="4"
        route="link"
        borderBottomColor="light.100"
        leftContent={<Text size="sm">Report an Issue or feedback</Text>}
      />
      <Spacer />
      <Box p="4" mb="5">
        <Button
          variant="outline"
          colorScheme="danger"
          py="4"
          borderRadius="32"
          onPress={() => handleLogout()}>
          Log out
        </Button>
      </Box>
    </Box>
  )
}

export default Settings

import React, { useCallback } from 'react'
import { Linking } from 'react-native'
import { Box, Text, Button, Spacer } from 'native-base'

import { useAuth, useUser } from '../../Hooks'
import { navigate } from '../../Navigation/navigationUtils'
import Routes from '../../Navigation/routesNames'
import { appBuildNumber, appVersion, ios } from '../../Theme/devices'
import images from '../../Theme/images'
import { googleSurveyURL } from '../../models/constants'

import ListItem from '../../Components/List/ListItem'
import ListSection from '../../Components/List/ListSection'
import Hero from '../../Components/Hero/Hero'

function Settings() {
  const { currentProperty, properties } = useUser()
  const { logout } = useAuth()

  const openProperties = useCallback(() => {
    navigate(Routes.Properties)
  }, [])

  const openReport = useCallback(() => {
    if (ios) {
      navigate(Routes.ReportIssue)
    } else {
      Linking.openURL(googleSurveyURL)
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <Box bg={'white'} flexGrow={1}>
      <Hero image source={images.SettingsBg} height={120} mask>
        <Text
          color="white"
          textAlign="center"
          size="lg"
          fontWeight="600"
          p="4"
          py={6}>
          Settings
        </Text>
      </Hero>

      <Box bg={'white'}>
        <ListSection>About</ListSection>
        <ListItem
          mt="4"
          borderBottomColor="light.100"
          leftContent={<Text size="sm">Version</Text>}
          rightContent={
            <Text size="sm" fontWeight="600">
              {appVersion}/{appBuildNumber}
            </Text>
          }
        />
        <ListItem
          mt="4"
          borderBottomColor="light.100"
          leftContent={<Text size="sm">Property</Text>}
          onPress={properties?.length > 1 ? openProperties : null}
          rightContent={
            <Text
              size="sm"
              fontWeight="600"
              numberOfLines={1}
              ellipsizeMode="tail">
              {currentProperty?.propertyName}
            </Text>
          }
        />
        <ListItem
          mt="4"
          borderBottomColor="light.100"
          leftContent={<Text size="sm">Report an Issue or feedback</Text>}
          onPress={openReport}
        />
      </Box>
      <Spacer bg="white" />
      <Box p="4" mb="5" bg="white">
        <Button
          variant="outline"
          colorScheme="danger"
          py="4"
          borderRadius="32"
          onPress={handleLogout}>
          Log out
        </Button>
      </Box>
    </Box>
  )
}

export default Settings

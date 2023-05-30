import React from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Box, Text, useTheme } from 'native-base'
import { Button } from 'native-base'

import { useAuth } from '../../Hooks/AuthContext'
import LogoIcon from '../../Components/Icons/Logo'

const Login = ({ navigation }) => {
  const { login } = useAuth()
  const { colors } = useTheme()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: colors.primary['100'],
  }

  const authenticate = async () => {
    return await login()
  }

  return (
    <Box bg="primary.100" flex="1">
      <SafeAreaView flexDirection="column">
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Box h="20" mt="5">
          <LogoIcon />
        </Box>
        <Box p="4">
          <Box p="10" bg="white" borderRadius="lg">
            <Text size="lg" mb="8" textAlign="center">Log in to your account</Text>
            <Button onPress={() => authenticate()} width="100%" bg="tertiary.500">
              Next
            </Button>
            <Text size="xs" mt="4" textAlign="center">
              By clicking "Next" you accept the
              <Text onPress={() => {}} color="primary.500"> Terms of Service</Text>
            </Text>

            <Button onPress={() => {}} variant="link" size="xs" mt="4">
              Sign up for Cloudbeds
            </Button>
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  )
}

export default Login

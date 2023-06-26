import React from 'react'
import { Box, Text, Button } from 'native-base'

import { useAuth } from '../../Hooks'

import LogoIcon from '../../Components/Icons/Logo'
import Layout from '../../Components/Layout'

const Login = () => {
  const { login } = useAuth()

  const authenticate = async () => {
    return await login()
  }

  return (
    <Layout noScroll noPadding>
      <Box h="20" mt="5">
        <LogoIcon />
      </Box>
      <Box p="4">
        <Box p="10" bg="white" borderRadius="lg">
          <Text size="lg" mb="8" textAlign="center">
            Log in to your account
          </Text>
          <Button onPress={authenticate} width="100%" bg="tertiary.500">
            Next
          </Button>
          <Text size="xs" mt="4" textAlign="center">
            By clicking "Next" you accept the
            <Text onPress={() => {}} color="primary.500">
              {' '}
              Terms of Service
            </Text>
          </Text>

          <Button onPress={() => {}} variant="link" size="xs" mt="4">
            Sign up for Cloudbeds
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default Login

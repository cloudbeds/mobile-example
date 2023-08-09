import React, { useEffect } from 'react'
import { Box, Text, Button } from 'native-base'
import { useIsFocused } from '@react-navigation/native'

import { useAuth } from '../../Hooks'

import LogoIcon from '../../Components/Icons/Logo'
import Layout from '../../Components/Layout'
import { useProgress } from '../../Components/ProgressHud/ProgressContext'

const Login = () => {
  const isFocused = useIsFocused()
  const { login, loading } = useAuth()
  const { showProgress, hideProgress } = useProgress()

  useEffect(() => {
    if (!loading && isFocused) {
      hideProgress()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isFocused])

  const authenticate = async () => {
    showProgress('Loading...')
    try {
      await login()
    } catch (error) {
      hideProgress()
    }
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

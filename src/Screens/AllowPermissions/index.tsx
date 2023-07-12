import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box, Button, HStack, Switch, Text, VStack } from 'native-base'

import { notificationService } from '../../Services/NotificationService'
import { useDimensions, useLocation, useUser } from '../../Hooks'
import { GenericNavigationProps } from '../../Navigation/types'
import Layout from '../../Components/Layout'

const AllowPermissions = ({}) => {
  const navigation = useNavigation<GenericNavigationProps>()
  const { changeAllowPermission } = useUser()
  const { getCurrentLocation } = useLocation()
  const { height, safeArea, headerHeight } = useDimensions()

  const [allowLocation, setAllowLocation] = useState(false)
  const [allowNotification, setAllowNotification] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    })
  }, [navigation])

  const changeAllowLocation = useCallback(
    async (value: boolean) => {
      if (value) {
        const allowed = await getCurrentLocation()
        setAllowLocation(allowed)
      } else {
        setAllowLocation(value)
      }
    },
    [getCurrentLocation],
  )

  const changeAllowNotification = useCallback(async (value: boolean) => {
    if (value) {
      try {
        const allowed =
          await notificationService.requestNotificationPermission()

        setAllowNotification(!!allowed)
      } catch (error) {}
    } else {
      setAllowNotification(value)
    }
  }, [])

  const nextPress = useCallback(() => {
    changeAllowPermission(true)
  }, [changeAllowPermission])

  return (
    <Layout noScroll>
      <Box h={height - headerHeight - safeArea.bottom}>
        <Text color={'primary.900'} fontWeight={'400'} py={2}>
          You can make changes in your device settings any time.
        </Text>

        <Box bg="white" borderRadius="lg" px={2} py={3}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <VStack>
              <Text color={'primary.900'} fontWeight={'600'}>
                Location services
              </Text>
              <Text size={'xs'} color={'fog.600'}>
                Required to accept card payments
              </Text>
            </VStack>

            <Switch
              size={'sm'}
              isChecked={allowLocation}
              onValueChange={changeAllowLocation}
            />
          </HStack>
        </Box>

        <Box bg="white" borderRadius="lg" px={2} py={3} mt={3}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <VStack>
              <Text color={'primary.900'} fontWeight={'600'}>
                Notifications
              </Text>
              <Text size={'xs'} color={'fog.600'}>
                Allows for reservation activity notifications
              </Text>
            </VStack>

            <Switch
              size={'sm'}
              isChecked={allowNotification}
              onValueChange={changeAllowNotification}
            />
          </HStack>
        </Box>

        <Box position={'absolute'} bottom={0} left={0} right={0} mb={8}>
          <Button
            isDisabled={!allowLocation || !allowNotification}
            onPress={nextPress}>
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default AllowPermissions

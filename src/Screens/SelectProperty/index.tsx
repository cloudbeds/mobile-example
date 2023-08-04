import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, HStack, Pressable, Text, VStack } from 'native-base'

import { GenericNavigationProps, RouteProps } from '../../Navigation/types'
import { useUser } from '../../Hooks'
import { PropertyProps, RolesProps } from '../../models/user'
import Routes from '../../Navigation/routesNames'

import Layout from '../../Components/Layout'
import ApartmentIcon from '../../Components/Icons/Apartment'

const SelectProperty = ({}) => {
  const navigation = useNavigation<GenericNavigationProps>()
  const route = useRoute<RouteProps>()
  const {
    properties,
    currentProperty,
    user,
    fetchUsers,
    changeCurrentProperty,
    changeAllowPermission,
  } = useUser()

  const routeName = route?.name

  useLayoutEffect(() => {
    if (routeName === Routes.SelectProperty) {
      navigation.setOptions({
        headerLeft: () => null,
      })
    }
  }, [navigation, routeName])

  useEffect(() => {
    fetchUsers(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateProperty = useCallback(
    (item: PropertyProps) => () => {
      changeCurrentProperty(item)
      changeAllowPermission(true)
    },
    [changeAllowPermission, changeCurrentProperty],
  )

  const renderItem = useCallback(
    (item: PropertyProps, index: number) => {
      return (
        <Pressable
          key={`${item?.propertyID}-${index}`}
          onPress={updateProperty(item)}>
          <HStack p={4} alignItems={'center'}>
            <ApartmentIcon />
            <Text
              color={'primary.900'}
              fontWeight={'500'}
              ml={3}
              maxW={'80%'}
              numberOfLines={1}>
              {item?.propertyName}
            </Text>
          </HStack>
        </Pressable>
      )
    },
    [updateProperty],
  )

  const renderRoles = useCallback(
    (role: RolesProps, idx: number) => {
      return (
        <Box key={`${role?.id}-${idx}`}>
          <HStack
            bg={'fog.600'}
            py={2}
            px={4}
            alignItems={'center'}
            borderTopLeftRadius={idx === 0 ? 'lg' : 0}
            borderTopRightRadius={idx === 0 ? 'lg' : 0}>
            <Text size={'sm'} color="white" fontWeight={'600'}>
              {role?.name} -{' '}
            </Text>
            <Text
              size={'xs'}
              lineHeight={'sm'}
              color="white"
              fontWeight={'500'}>
              {properties?.length} properties
            </Text>
          </HStack>

          <Box py={2}>{properties?.map(renderItem)}</Box>
        </Box>
      )
    },
    [properties, renderItem],
  )

  return (
    <Layout>
      {currentProperty && (
        <VStack mb={6}>
          <Text color={'fog.600'}>Current Property</Text>
          <HStack
            bg="white"
            borderRadius="lg"
            p={3}
            alignItems={'center'}
            mt={2}>
            <ApartmentIcon />
            <VStack ml={3}>
              <Text color={'primary.900'} fontWeight={'500'}>
                {currentProperty?.propertyName}
              </Text>
              <Text fontSize={12} color={'fog.600'} mt={0.5}>
                {user?.roles?.[0]?.name}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      )}

      <Box bg="white" borderRadius="lg">
        {user?.roles?.map(renderRoles)}
      </Box>
    </Layout>
  )
}

export default SelectProperty

import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from 'react-native-splash-screen'
import { useTheme } from 'native-base'

import { useUser, useAuth } from '../Hooks'

import { isMountedRef, navigationRef } from './navigationUtils'
import Routes from './routesNames'
import { renderHeader } from './header'
import MainStack from './MainStack'
import Indicator from '../Components/ProgressHud/Indicator'

import Login from '../Screens/Auth/Login'
import ReservationList from '../Screens/ReservationList/ReservationList'
import SelectProperty from '../Screens/SelectProperty'
import AllowPermissions from '../Screens/AllowPermissions'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  const { tokenData, getAuthSession, loading, logout } = useAuth()
  const { properties, isAllowed, fetchUsers } = useUser()
  const { colors } = useTheme()

  const accessToken = tokenData?.accessToken

  const bootstrapAsync = async () => {
    try {
      await getAuthSession()
    } catch (e) {
      // Restoring token failed
    }
  }

  useEffect(() => {
    const mounted = async () => {
      isMountedRef.current = true

      return () => (isMountedRef.current = false)
    }

    mounted()

    bootstrapAsync()
  })

  useEffect(() => {
    if (accessToken) {
      fetchUsers(false)
    }

    // logout()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  if (!loading) {
    SplashScreen.hide()
  } else {
    return null
  }

  const isLoggedIn = !!accessToken
  const allowProperty = !isAllowed && properties?.length > 1
  const permissionAllow = !isAllowed && properties?.length === 1

  if (isLoggedIn && !isAllowed && !allowProperty && !permissionAllow) {
    return <Indicator />
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={({ navigation }) => {
            return {
              ...renderHeader({ navigation, colors }),
            }
          }}>
          {allowProperty ? (
            <Stack.Screen
              name={Routes.SelectProperty}
              component={SelectProperty}
              options={({ route }) => ({
                title: route?.params?.title || 'Select a Property',
                headerShown: true,
              })}
            />
          ) : permissionAllow ? (
            <Stack.Screen
              name={Routes.AllowPermissions}
              component={AllowPermissions}
              options={({ route }) => ({
                title: route?.params?.title || 'Allow App Permissions',
                headerShown: true,
              })}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen name="Main" component={MainStack} />
              <Stack.Screen
                name="ReservationList"
                component={ReservationList}
                options={({ route }) => ({
                  title: route.params.title,
                  headerShown: true,
                })}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.Login} component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppStack

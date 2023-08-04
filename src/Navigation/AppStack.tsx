import React, { useCallback, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from 'react-native-splash-screen'
import { useTheme } from 'native-base'

import { useUser, useAuth, useLocation } from '../Hooks'

import { isMountedRef, navigationRef } from './navigationUtils'
import Routes from './routesNames'
import { renderHeader } from './header'
import MainStack from './MainStack'
import Indicator from '../Components/ProgressHud/Indicator'
import { notificationService } from '../Services/NotificationService'
import renderModals from './modals'

import Login from '../Screens/Auth/Login'
import ReservationList from '../Screens/ReservationList'
import SelectProperty from '../Screens/SelectProperty'
import AllowPermissions from '../Screens/AllowPermissions'
import AddNote from '../Screens/AddNote'
import Rooms from '../Screens/Housekeeping/Rooms'
import ReportIssue from '../Screens/Settings/ReportIssue'
import TakePayment from '../Screens/TakePayment'

const Stack = createStackNavigator()

const AppStack = () => {
  const { tokenData, getAuthSession, loading } = useAuth()
  const { properties, isAllowed, fetchUsers } = useUser(true)
  const { getCurrentLocation } = useLocation()
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  useEffect(() => {
    if (accessToken && isAllowed) {
      requestPermissions()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isAllowed])

  const requestPermissions = useCallback(async () => {
    try {
      await getCurrentLocation()
      await notificationService.requestNotificationPermission()
    } catch (error) {}
  }, [getCurrentLocation])

  const isLoggedIn = !!accessToken
  const allowProperty = !isAllowed && properties?.length > 1
  const permissionAllow = !isAllowed && properties?.length === 1

  const isLoading =
    isLoggedIn && !isAllowed && !allowProperty && !permissionAllow

  if (!loading) {
    SplashScreen.hide()
  }

  if (isLoading) {
    return <Indicator />
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <Stack.Navigator
          screenOptions={({ navigation }) => {
            return {
              ...renderHeader({ navigation, color: colors.primary['100'] }),
            }
          }}>
          {allowProperty ? (
            <Stack.Screen
              name={Routes.SelectProperty}
              component={SelectProperty}
              options={{ title: 'Select a Property', headerShown: true }}
            />
          ) : permissionAllow ? (
            <Stack.Screen
              name={Routes.AllowPermissions}
              component={AllowPermissions}
              options={{ title: 'Allow App Permissions', headerShown: true }}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen name={Routes.Main} component={MainStack} />
              <Stack.Screen
                name={Routes.ReservationList}
                component={ReservationList}
                options={({ route }) => ({
                  // @ts-ignore
                  title: route?.params?.title,
                  headerShown: true,
                  headerTitleAlign: 'left',
                  headerShadowVisible: true,
                  headerStyle: { backgroundColor: 'white' },
                })}
              />
              <Stack.Screen
                name={Routes.AddNote}
                component={AddNote}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={Routes.Rooms}
                component={Rooms}
                options={{
                  title: 'Rooms',
                  headerShown: true,
                  headerStyle: { backgroundColor: colors.info['400'] },
                }}
              />
              <Stack.Screen
                name={Routes.Properties}
                component={SelectProperty}
                options={{ title: 'Select a Property', headerShown: true }}
              />
              <Stack.Screen
                name={Routes.ReportIssue}
                component={ReportIssue}
                options={{ title: '', headerShown: true }}
              />
              <Stack.Screen
                name={Routes.TakePayment}
                component={TakePayment}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          )}

          {renderModals(Stack)}
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

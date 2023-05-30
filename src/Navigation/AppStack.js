import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from 'react-native-splash-screen'

import MainStack from './MainStack'
import Login from '../Screens/Auth/Login'
import ReservationList from '../Screens/ReservationList/ReservationList'

import { useAuth } from '../Hooks/AuthContext'
import UserProvider from '../Hooks/UserContext'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  const { accessToken, getAuthSession, isLoading, fetchUserInfo } = useAuth()

  const bootstrapAsync = async () => {
    try {
      await getAuthSession()
    } catch (e) {
      // Restoring token failed
    }
  }

  useEffect(() => {
    bootstrapAsync()
  })

  if (!isLoading) {
    SplashScreen.hide()
  } else {
    return null
  }

  let isLoggedIn = !!accessToken
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <UserProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          </Stack.Navigator>
        </UserProvider>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppStack

import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from './Theme'

import AuthProvider from './Hooks/AuthContext'
import APIQueryClientProvider from './Hooks/APIQueryClient'
import AppStack from './Navigation/AppStack'

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AuthProvider>
          <APIQueryClientProvider>
            <AppStack />
          </APIQueryClientProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  )
}

export default App

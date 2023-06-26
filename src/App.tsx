import React from 'react'
import { LogBox } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

import 'react-native-gesture-handler'

import theme from './Theme'

import APIQueryClientProvider from './Hooks/APIQueryClient'
import AppStack from './Navigation/AppStack'
import { store } from './store/store'
import { ProgressProvider } from './Components/ProgressHud/ProgressContext'

let persistor = persistStore(store)

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ProgressProvider>
            <SafeAreaProvider>
              <APIQueryClientProvider>
                <AppStack />
              </APIQueryClientProvider>
            </SafeAreaProvider>
          </ProgressProvider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  )
}

export default App

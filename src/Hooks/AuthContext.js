import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { AsyncStorage } from 'react-native'

import Authentication from '../Services/Authentication'

export const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthService = new Authentication({
  tokenStorage: AsyncStorage, // todo replace with secure storage
})

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOG_IN':
          return {
            ...prevState,
            isLogout: false,
            isLoading: false,
            accessToken: action.token,
          }
        case 'LOG_OUT':
          return {
            ...prevState,
            isLogout: true,
            isLoading: false,
            accessToken: null,
          }
      }
    },
    {
      isLoading: true,
      isLogout: false,
      accessToken: null,
    },
  )

  const authContext = useMemo(
    () => ({
      getAuthSession: async () => {
        let tokenData = {}
        try {
          tokenData = await AuthService.getAccessToken()

          if (!tokenData) {
            throw new Error()
          }

          // check token is valid
          let isValid = AuthService.isTokenValid(tokenData)

          if (!isValid) {
            tokenData = await AuthService.refreshToken(tokenData)
          }

          dispatch({ type: 'LOG_IN', token: tokenData.accessToken })

          return tokenData
        } catch (err) {
          dispatch({ type: 'LOG_OUT' })
        }
      },
      login: async () => {
        let tokenData = await AuthService.login()
        dispatch({ type: 'LOG_IN', token: tokenData.accessToken })
      },
      logout: async () => {
        await AuthService.logout()

        dispatch({ type: 'LOG_OUT' })
      },
      isLoading: state.isLoading,
      isLogout: state.isLogout,
      accessToken: state.accessToken,
    }),
    [state.isLoading, state.isLogout, state.accessToken],
  )

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

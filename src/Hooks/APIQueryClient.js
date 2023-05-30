import React, { createContext, useContext, useMemo, useReducer } from 'react'
import axios from 'axios'
import { focusManager, QueryClient, QueryClientProvider } from 'react-query'

import { useAuth } from './AuthContext'
import { useOnlineManager } from './useOnlineManager'
import { useAppState } from './useAppState'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
  },
})

const onAppStateChange = status => {
  focusManager.setFocused(status === 'active')
}

export const APIQueryClientContext = createContext(null)

export const useAPIQueryClient = () => {
  return useContext(APIQueryClientContext)
}

const APIQueryClientProvider = ({ children }) => {
  const { getAuthSession } = useAuth()

  useOnlineManager()
  useAppState(onAppStateChange)

  const auth = (method, includeToken = true, ...args) => {
    // isAuthenticated
    return getAuthSession().then(tokenData => {
      let req
      // is authorized, token may have been refreshed
      if (method === 'request') {
        req = axios
      }

      console.log(args)

      req = axios[method]

      if (includeToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${tokenData.accessToken}`
        return req(...args).then(res => res.data)
      } else {
        delete axios.defaults.headers.common.Authorization
        return req(...args).then(res => res.data)
      }
    })
  }

  const apiQueryContext = {
    get: async (...args) => {
      return auth('get', true, ...args)
    },
    post: async (...args) => {
      return auth('post', true, ...args)
    },
    put: async (...args) => {
      return auth('put', true, ...args)
    },
    delete: async (...args) => {
      return auth('delete', true, ...args)
    },
  }

  return (
    <QueryClientProvider client={queryClient}>
      <APIQueryClientContext.Provider value={apiQueryContext}>
        {children}
      </APIQueryClientContext.Provider>
    </QueryClientProvider>
  )
}

export default APIQueryClientProvider

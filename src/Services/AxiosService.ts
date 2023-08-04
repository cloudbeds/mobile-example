import axios from 'axios'

import Authentication from './Authentication'
import { store } from '../store/store'
import { changeTokenData } from '../store/slices/userSlice'

const AuthService = new Authentication()

const getAuthSession = async () => {
  let tokenData: any = {}
  try {
    tokenData = store.getState().user?.tokenData

    if (!tokenData) {
      throw new Error()
    }

    // check token is valid
    let isValid = AuthService.isTokenValid(tokenData)

    if (!isValid) {
      tokenData = await AuthService.refreshToken(tokenData)
    }

    store.dispatch(changeTokenData(tokenData))

    return tokenData
  } catch (err) {}
}

const auth = async (method: string, includeToken = true, ...args: any[]) => {
  // isAuthenticated
  return getAuthSession().then(tokenData => {
    let req: any
    // is authorized, token may have been refreshed
    if (method === 'request') {
      req = axios
    }

    console.log(args)

    // @ts-ignore
    req = axios[method]

    if (includeToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${tokenData?.accessToken}`
      return req(...args).then((res: any) => res.data)
    } else {
      delete axios.defaults.headers.common.Authorization
      return req(...args).then((res: any) => res.data)
    }
  })
}

export const apiQueryContext = {
  get: async (...args: any) => {
    return auth('get', true, ...args)
  },
  post: async (...args: any) => {
    return auth('post', true, ...args)
  },
  put: async (...args: any) => {
    return auth('put', true, ...args)
  },
  delete: async (...args: any) => {
    return auth('delete', true, ...args)
  },
}

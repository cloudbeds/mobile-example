import CookieManager from '@react-native-cookies/cookies'
import { authorize, refresh } from 'react-native-app-auth'

import {
  IDENTITY_AUTHORIZATION_URL,
  IDENTITY_TOKEN_ENDPOINT,
  IDENTITY_CLIENT_ID,
  IDENTITY_CLIENT_SECRET,
  IDENTITY_REDIRECT_URL,
  // IDENTITY_SCOPES,
  // @ts-ignore
} from '@env'
import { TokenDataProps } from '../models/user'
import { store } from '../store/store'
import { clearUser } from '../store/slices/userSlice'

const AuthConfig = {
  warmAndPrefetchChrome: true,
  usePKCE: false,
  iosPrefersEphemeralSession: true,

  // TODO:: move to a secure storage or handle token fetch on API
  // skipCodeExchange: true,
  // dangerouslyAllowInsecureHttpRequests: true,
  clientId: IDENTITY_CLIENT_ID,
  clientSecret: IDENTITY_CLIENT_SECRET,
  redirectUrl: IDENTITY_REDIRECT_URL,
  // scopes: IDENTITY_SCOPES.split(','),
  serviceConfiguration: {
    authorizationEndpoint: IDENTITY_AUTHORIZATION_URL,
    tokenEndpoint: IDENTITY_TOKEN_ENDPOINT,
  },
}

class Authentication {
  constructor() {}

  isTokenValid(tokenData: TokenDataProps) {
    if (tokenData) {
      return (
        new Date(tokenData?.accessTokenExpirationDate).getTime() > Date.now()
      )
    }

    return false
  }

  async refreshToken(tokenData: TokenDataProps) {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const result = await refresh(AuthConfig, {
          refreshToken: tokenData?.refreshToken,
        })
        console.log(result)
        resolve(result)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  async login() {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        const result = await authorize(AuthConfig)
        console.log(result)
        resolve(result)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  async logout() {
    // const result = await logout(AuthConfig)
    CookieManager.clearAll(true)
    store.dispatch(clearUser())
    // return result
  }
}

export default Authentication

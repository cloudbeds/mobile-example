import CookieManager from '@react-native-cookies/cookies'
import { authorize, refresh, logout } from 'react-native-app-auth'
// @ts-ignore
import {
  IDENTITY_AUTHORIZATION_URL,
  IDENTITY_TOKEN_ENDPOINT,
  IDENTITY_CLIENT_ID,
  IDENTITY_CLIENT_SECRET,
  IDENTITY_REDIRECT_URL,
  IDENTITY_SCOPES,
} from '@env'

const TOKEN_KEY = '@cloudbeds/token'

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
  scopes: IDENTITY_SCOPES.split(','),
  serviceConfiguration: {
    authorizationEndpoint: IDENTITY_AUTHORIZATION_URL,
    tokenEndpoint: IDENTITY_TOKEN_ENDPOINT,
  },
}

class Authentication {
  constructor({ tokenStorage, authorizeCallback }) {
    this.tokenStorage = tokenStorage
    this.authorize = authorizeCallback
  }

  async getAccessToken() {
    try {
      let value = await this.tokenStorage.getItem(TOKEN_KEY)
      if (value) {
        return JSON.parse(value)
      }
    } catch (error) {
      throw error
    }
  }

  async removeAccessToken() {
    try {
      await this.tokenStorage.removeItem(TOKEN_KEY)
    } catch (error) {
      throw error
    }
  }

  async setAccessToken(tokenData) {
    try {
      await this.tokenStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData))
    } catch (error) {
      throw error
    }
  }

  isTokenValid(tokenData) {
    if (tokenData) {
      return (
        new Date(tokenData.accessTokenExpirationDate).getTime() > Date.now()
      )
    }

    return false
  }

  async refreshToken(tokenData) {
    const result = await refresh(AuthConfig, {
      refreshToken: tokenData.refreshToken,
    })
    this.setAccessToken(result)
    return result
  }

  async login() {
    const result = await authorize(AuthConfig)
    // console.log(result)
    this.setAccessToken(result)
    return result
  }

  async logout() {
    // const result = await logout(AuthConfig)
    CookieManager.clearAll(true)
    this.removeAccessToken()
    // return result
  }
}

export default Authentication

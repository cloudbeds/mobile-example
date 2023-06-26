import { createSlice } from '@reduxjs/toolkit'
import { GeolocationResponse } from '@react-native-community/geolocation'

import { PropertyProps, TokenDataProps, UserInfoProps } from '../../models/user'

export interface UserInterface {
  tokenData: TokenDataProps | null
  user: UserInfoProps | null
  properties: PropertyProps[]
  currentProperty: PropertyProps | null
  isAllowed: boolean
  currentLocation: GeolocationResponse | null
}

const initialState: UserInterface = {
  tokenData: null,
  user: null,
  properties: [],
  currentProperty: null,
  isAllowed: false,
  currentLocation: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTokenData(state: UserInterface, action) {
      state.tokenData = action.payload
    },
    changeUserInfo(state: UserInterface, action) {
      state.user = action.payload
    },
    changeProperties(state: UserInterface, action) {
      state.properties = action.payload
    },
    changeCurrentProperty(state: UserInterface, action) {
      state.currentProperty = action.payload
    },
    changeAllowed(state: UserInterface, action) {
      state.isAllowed = action.payload
    },
    changeCurrentLocation(state: UserInterface, action) {
      state.currentLocation = action.payload
    },
    clearUser() {
      return initialState
    },
  },
})

export const {
  changeTokenData,
  changeUserInfo,
  changeProperties,
  changeCurrentProperty,
  changeAllowed,
  clearUser,
  changeCurrentLocation,
} = userSlice.actions

export default userSlice.reducer

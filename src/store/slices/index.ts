import { combineReducers } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import deviceSlice from './deviceSlice'
import reservationSlice from './reservationSlice'

const rootReducer = combineReducers({
  user: userSlice,
  device: deviceSlice,
  reservation: reservationSlice,
})

export default rootReducer

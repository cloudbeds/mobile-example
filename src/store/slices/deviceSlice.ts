import { createSlice } from '@reduxjs/toolkit'

import {
  filterHousekeepersByID,
  FilterTypes,
  HousekeepersProps,
  OptionsProps,
} from '../../models/housekeeping'
import Reservations from '../../Services/Reservations'

export interface DeviceInterface {
  isAllowed: boolean
  housekeepingFilters: { [key in FilterTypes]: any[] }
  roomTypes: OptionsProps[]
  housekeepers: HousekeepersProps[]
}

const initialState: DeviceInterface = {
  isAllowed: false,
  housekeepingFilters: {
    [FilterTypes.Type]: ['all'],
    [FilterTypes.Status]: ['all'],
    [FilterTypes.Condition]: ['all'],
    [FilterTypes.Assigned]: ['all'],
    [FilterTypes.Frontdesk]: ['all'],
  },
  roomTypes: [],
  housekeepers: [],
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    changeAllowed(state: DeviceInterface, action) {
      state.isAllowed = action.payload
    },

    changeHousekeepingFilters(state: DeviceInterface, action) {
      state.housekeepingFilters = {
        ...state.housekeepingFilters,
        ...action.payload,
      }
    },

    changeRoomTypes(state: DeviceInterface, action) {
      const newTypes = [...(action.payload || []), ...(state.roomTypes || [])]

      state.roomTypes = Reservations.filterRoomTypes(newTypes || [])
    },

    changeHousekeepers(state: DeviceInterface, action) {
      const newTypes = [
        ...(action.payload || []),
        ...(state.housekeepers || []),
      ]

      state.housekeepers = filterHousekeepersByID(newTypes || [])
    },

    clearDevice() {
      return initialState
    },
  },
})

export const {
  changeAllowed,
  changeHousekeepingFilters,
  changeRoomTypes,
  changeHousekeepers,
  clearDevice,
} = deviceSlice.actions

export default deviceSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

import {
  filterHousekeepersByID,
  FilterTypes,
  HousekeepersProps,
  OptionsProps,
} from '../../models/housekeeping'
import Reservations from '../../Services/Reservations'

export interface DeviceInterface {
  housekeepingFilters: { [key in FilterTypes]: any[] }
  roomTypes: OptionsProps[]
  housekeepers: HousekeepersProps[]
}

const initialState: DeviceInterface = {
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
    changeHousekeepingFilters(state: DeviceInterface, action) {
      state.housekeepingFilters = {
        ...state.housekeepingFilters,
        ...action.payload,
      }
    },

    changeRoomTypes(state: DeviceInterface, action) {
      const newTypes = [...(state.roomTypes || []), ...(action.payload || [])]

      state.roomTypes = Reservations.filterRoomTypes(newTypes || [])
    },

    changeHousekeepers(state: DeviceInterface, action) {
      const newTypes = [
        ...(state.housekeepers || []),
        ...(action.payload || []),
      ]

      state.housekeepers = filterHousekeepersByID(newTypes || [])
    },

    clearDevice() {
      return initialState
    },
  },
})

export const {
  changeHousekeepingFilters,
  changeRoomTypes,
  changeHousekeepers,
  clearDevice,
} = deviceSlice.actions

export default deviceSlice.reducer

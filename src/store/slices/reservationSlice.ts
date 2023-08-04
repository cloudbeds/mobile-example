import { createSlice } from '@reduxjs/toolkit'

import { ReservationProps } from '../../models/reservation'
import Reservations from '../../Services/Reservations'
import { RoomTypesProps } from '../../models/room'

export interface ReservationInterface {
  reservations: ReservationProps[]
  roomTypes: RoomTypesProps[]
}

const initialState: ReservationInterface = {
  reservations: [],
  roomTypes: [],
}

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    changeReservations(state: ReservationInterface, action) {
      const newReservations = [
        ...(state.reservations || []),
        ...(action.payload || []),
      ]

      state.reservations = Reservations.parseReservations(newReservations || [])
    },

    changeRoomTypes(state: ReservationInterface, action) {
      const newTypes = [...(state.roomTypes || []), ...(action.payload || [])]

      state.roomTypes = Reservations.filterRoomTypesByID(newTypes || [])
    },

    clearReservation() {
      return initialState
    },
  },
})

export const { changeReservations, changeRoomTypes, clearReservation } =
  reservationSlice.actions

export default reservationSlice.reducer

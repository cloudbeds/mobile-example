import _ from 'lodash'
import moment from 'moment-timezone'

import { GuestProps, ReservationProps, RoomProps } from '../models/reservation'
import { GuestProps as DGuestProps } from '../models/guest'
import { HousekeepingStatusProps, OptionsProps } from '../models/housekeeping'
import { RoomTypesProps } from '../models/room'

class Reservations {
  static getReservationIdentifier(reservation: ReservationProps & GuestProps) {
    return (
      reservation?.thirdPartyIdentifier ||
      reservation?.subReservationID ||
      reservation?.reservationID ||
      reservation?.sourceName
    )
  }

  static parseReservations(reservations: ReservationProps[] = []) {
    return _.uniqBy(
      reservations.reduce(
        (prev: (ReservationProps & GuestProps & RoomProps)[], next) => {
          let newReservations: (ReservationProps & GuestProps & RoomProps)[] =
            []

          if (next.guestList) {
            _.map(next.guestList, guest => {
              newReservations.push({
                ...next,
                ...guest,
              })
            })
          } else {
            newReservations.push({
              ...next,
            })
          }

          prev = prev.concat(newReservations)

          return prev
        },
        [],
      ),
      'reservationID',
    )
  }

  static filterGuests(reservation: DGuestProps[] = []) {
    return _.uniqBy(reservation, 'guestID')?.map(g => ({ ...g, isGuest: true }))
  }

  static filterRooms(rooms: RoomProps[] & HousekeepingStatusProps[] = []) {
    return _.uniqBy(rooms, 'roomID')
  }

  static filterRoomTypes(rooms: OptionsProps[] = []) {
    return _.uniqBy(rooms, 'value')
  }

  static filterRoomTypesByID(roomTypes: RoomTypesProps[] = []) {
    return _.uniqBy(roomTypes, 'roomTypeID')
  }

  static filterRoomsByType(rooms: RoomProps[] = [], roomTypeIDs: any[] = []) {
    return rooms?.filter(r => roomTypeIDs?.includes(r?.roomTypeID?.toString()))
  }

  static assignedRoom(reservation: RoomProps & GuestProps) {
    return !!(reservation?.roomID && !reservation?.unassignedRooms?.length)
  }

  static isMoreRoomsThanOne(reservation: RoomProps & GuestProps) {
    return (
      [...(reservation?.rooms || []), ...(reservation?.unassignedRooms || [])]
        ?.length > 1
    )
  }

  static getRoomNames(reservation: ReservationProps) {
    if (!reservation?.assigned?.length) {
      return null
    }

    return reservation?.assigned?.map(a => a?.roomName).join(', ')
  }

  static formatDate(datetime: any) {
    if (!datetime) {
      return ''
    }

    return moment(datetime).toDate().toLocaleDateString('en', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  static formatFullDate(datetime: any) {
    if (!datetime) {
      return ''
    }

    return moment(datetime).format('MM/DD/YYYY HH:mm A')
  }
}

export default Reservations

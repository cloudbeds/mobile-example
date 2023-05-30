import _ from 'lodash'

class Reservations {
  static getReservationIdentifier(reservation) {
    return (
      reservation.thirdPartyIdentifier ||
      reservation.subReservationID ||
      reservation.reservationID ||
      reservation.sourceName
    )
  }
  static parseReservations(reservations = []) {
    return _.uniqBy(
      reservations.reduce((prev, next) => {
        let newReservations = []

        if (next.guestList) {
          _.map(next.guestList, guest => {
            if (!guest.rooms.length && guest.subReservationID) {
              newReservations.push({
                ...next,
                ...guest
              })
            } else {
              guest.rooms.map(room => {
                newReservations.push({
                  ...next,
                  ...room
                })
              })
            }
          })
        }

        prev = prev.concat(newReservations)

        return prev
      }, []),
      'subReservationID',
    )
  }

  static assignedRoom(reservation) {
    // const { guestList } = reservation
    // let assigned = null

    // if (guestList) {
    //   _.map(guestList, guest => {
    //     if (guest.assignedRoom) {
    //       assigned = guest.roomID
    //     }
    //   })
    // }

    return reservation.roomID
  }

  static getRoomNames(reservation) {
    return reservation.roomName
  }
}

export default Reservations

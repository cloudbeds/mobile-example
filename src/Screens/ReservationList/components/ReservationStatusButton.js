import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash'
import { Button, Spinner } from 'native-base'
import { Alert } from 'react-native'

import ReservationRoomsList from './ReservationRoomsList'

import Reservations from '../../../Services/Reservations'
import { usePostRoomAssign, usePutReservation } from '../../../Hooks/api'

const ReservationStatus = ({ reservation, onUpdate }) => {
  const { status, guestName, reservationID, subReservationID } = reservation

  const [roomSelectOpen, setRoomSelectOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const { mutate: updateReservation } = usePutReservation()
  const { mutate: postRoomAssign } = usePostRoomAssign()
  let assignedRoom = Reservations.assignedRoom(reservation)

  let label = ''
  let buttonBg = 'primary.500'
  let spinnerColor = 'white'
  let buttonVariant = 'solid'
  let action = ''

  // check in
  if (
    _.includes(['not_confirmed', 'confirmed'], status) &&
    !assignedRoom
  ) {
    action = 'assign'
    label = 'Assign'
    buttonVariant = 'outline'
    buttonBg = 'white'
    spinnerColor = 'primary.500'
  } else if (
    _.includes(['not_confirmed', 'confirmed'], status) &&
    assignedRoom
  ) {
    action = 'checkin'
    label = 'Check-In'
  } else if (_.includes(['checked_in'], status)) {
    action = 'checkout'
    label = 'Check-Out'
  }

  const handleCheckin = () => {
    setIsLoading(true)

    updateReservation(
      { reservationID, status: 'checked_in' },
      {
        onSuccess: data => {
          console.log(data)
          setIsLoading(false)

          if (data.message /*&& !data.success*/) {
            Alert.alert('Warning', data.message, [
              { text: 'Ok', style: 'cancel' },
            ])
          }

          onUpdate()
        },
        onError: () => {
          setIsLoading(false)
        },
      },
    )
  }

  const handleCheckout = () => {
    setIsLoading(true)

    updateReservation(
      { reservationID, status: 'checked_out' },
      {
        onSuccess: data => {
          console.log(data)
          setIsLoading(false)

          if (data.message && !data.success) {
            Alert.alert('Warning', data.message, [
              { text: 'Ok', style: 'cancel' },
            ])
          }

          onUpdate()
        },
        onError: () => {
          setIsLoading(false)
        },
      },
    )
  }

  const handleRoomSelect = (val) => {
    setIsLoading(true)
    setRoomSelectOpen(false)

    postRoomAssign(
      { reservationID, newRoomID: val.roomID, roomTypeID: val.roomTypeID },
      {
        onSuccess: data => {
          console.log(data)
          setIsLoading(false)

          if (data.message && !data.success) {
            Alert.alert('Warning', data.message, [
              { text: 'Ok', style: 'cancel' },
            ])
          }

          onUpdate()
        },
        onError: () => {
          setIsLoading(false)
        },
      },
    )
  }

  const handlePress = () => {
    switch (action) {
      case 'assign': {
        setRoomSelectOpen(true)
        break
      }
      case 'checkin': {
        // confirm modal
        Alert.alert(
          'Confirm Check In',
          `Are you sure you want to check in ${guestName}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Confirm', onPress: () => handleCheckin() },
          ],
        )
        break
      }
      case 'checkout': {
        // confirm modal
        Alert.alert(
          'Confirm Check Out',
          `Are you sure you want to check out ${guestName}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            { text: 'Confirm', onPress: () => handleCheckout() },
          ],
        )
        break
      }
    }
  }

  return (
    <>
      <Button
        bg={buttonBg}
        variant={buttonVariant}
        onPress={() => handlePress()}
        minWidth="32">
        {isLoading ? <Spinner color={spinnerColor} /> : label}
      </Button>

      <ReservationRoomsList
        isOpen={roomSelectOpen}
        onClose={() => setRoomSelectOpen(false)}
        guestName={reservation.guestName}
        reservationId={reservation.subReservationID}
        startDate={reservation.startDate}
        endDate={reservation.endDate}
        onSelect={val => handleRoomSelect(val)}
        selectedRoom={assignedRoom}
      />
    </>
  )
}

export default ReservationStatus

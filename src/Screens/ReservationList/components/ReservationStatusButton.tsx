import React, { useCallback, useEffect, useState } from 'react'
import { Button, Spinner, useDisclose } from 'native-base'
import _ from 'lodash'

import Reservations from '../../../Services/Reservations'
import {
  useGetRooms,
  useGetRoomsUnassigned,
  usePostRoomAssign,
  usePutReservation,
} from '../../../Hooks/api'
import {
  GuestProps,
  ReservationProps,
  RoomProps,
  ReservationStatus as ReservationStatusValue,
  DashboardTypes,
} from '../../../models/reservation'
import { RoomProps as DefaultRoomProps } from '../../../models/room'
import { RouteParamsInterface } from '../../../Navigation/types'
import { navigate } from '../../../Navigation/navigationUtils'
import { Routes } from '../../../Navigation/routesNames'
import { useToast } from '../../../Hooks'
import { ToastTypes } from '../../../Hooks/useToast'

import ReservationRoomsList from './ReservationRoomsList'
import AssignRooms from './AssignRooms'

interface Props {
  reservation: ReservationProps & GuestProps & RoomProps
  onUpdate: () => void
  type: DashboardTypes
}

const ReservationStatus = ({ reservation, onUpdate, type }: Props) => {
  const { status, guestName, reservationID } = reservation
  const { showToast } = useToast()
  const { isOpen, onOpen, onClose } = useDisclose()

  const [roomSelectOpen, setRoomSelectOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [roomTypeID, setRoomTypeID] = useState(
    reservation?.unassignedRooms?.[0]?.roomTypeID ||
      reservation?.assigned?.[0]?.roomTypeID ||
      '',
  )

  const { mutate: updateReservation } = usePutReservation()
  const { mutate: postRoomAssign } = usePostRoomAssign()
  let isMoreRoomsThanOne = Reservations.isMoreRoomsThanOne(reservation)
  let assignedRoom = Reservations.assignedRoom(reservation)

  const { data, refetch } = useGetRooms(
    reservation?.reservationID,
    {
      startDate: reservation?.startDate,
      endDate: reservation?.endDate,
      roomTypeID,
    },
    {
      enabled: type === DashboardTypes.arrivals,
    },
  )

  const { data: allRoomsData } = useGetRoomsUnassigned(
    reservation?.reservationID,
    {
      startDate: reservation?.startDate,
      endDate: reservation?.endDate,
    },
    {
      enabled: type === DashboardTypes.arrivals,
    },
  )

  useEffect(() => {
    if (type === DashboardTypes.arrivals) {
      refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypeID])

  const roomTypeIDs = _.uniq(
    [
      ...(reservation?.unassignedRooms || []),
      ...(reservation?.assigned || []),
    ]?.map(r => r?.roomTypeID),
  )

  const allRoomsForCheck = Reservations.filterRoomsByType(
    [...(allRoomsData?.data[0]?.rooms || [])],
    roomTypeIDs,
  ).filter(r => r?.roomTypeID?.toString() === roomTypeID?.toString())

  const allRooms = [...(data?.data[0]?.rooms || [])]

  const assignedRooms = [...(reservation?.assigned || [])]?.filter(
    r => r?.roomTypeID?.toString() === roomTypeID?.toString(),
  )
  let rooms: RoomProps[] = [...allRooms, ...assignedRooms]

  rooms = Reservations.filterRooms(rooms)

  let label = ''
  let buttonBg = 'primary.500'
  let spinnerColor = 'white'
  let buttonVariant = 'solid'
  let action = ''

  // check in
  if (
    _.includes(
      [ReservationStatusValue.not_confirmed, ReservationStatusValue.confirmed],
      status,
    ) &&
    !assignedRoom
  ) {
    action = 'assign'
    label = 'Assign'
    buttonVariant = 'outline'
    buttonBg = 'white'
    spinnerColor = 'primary.500'
  } else if (
    _.includes(
      [ReservationStatusValue.not_confirmed, ReservationStatusValue.confirmed],
      status,
    ) &&
    assignedRoom
  ) {
    action = 'checkin'
    label = 'Check in'
  } else if (_.includes([ReservationStatusValue.checked_in], status)) {
    action = 'checkout'
    label = 'Check out'
  }

  const handleCheckin = useCallback(
    (fromRooms: boolean) => {
      setIsLoading(true)

      updateReservation(
        { reservationID, status: ReservationStatusValue.checked_in } as any,
        {
          onSuccess: data => {
            console.log(data)
            setIsLoading(false)

            if (data.message && !data.success) {
              showToast({
                description: data.message,
                title: 'Warning!',
                type: ToastTypes.warning,
              })
            } else {
              showToast({
                description: `${guestName} has been checked in.`,
                title: 'Success!',
              })
              onUpdate()

              if (fromRooms) {
                onClose()
              }
            }
          },
          onError: () => {
            setIsLoading(false)
            showToast({
              description: 'Something went wrong.',
              title: 'Error!',
              type: ToastTypes.error,
            })
          },
        },
      )
    },
    [guestName, onClose, onUpdate, reservationID, showToast, updateReservation],
  )

  const handleCheckout = useCallback(() => {
    setIsLoading(true)

    updateReservation(
      { reservationID, status: ReservationStatusValue.checked_out } as any,
      {
        onSuccess: data => {
          console.log(data)
          setIsLoading(false)

          if (data.message && !data.success) {
            showToast({
              description: data.message,
              title: 'Warning!',
              type: ToastTypes.warning,
            })
          } else {
            showToast({
              description: `${guestName} has been checked out.`,
              title: 'Success!',
            })
            onUpdate()
          }
        },
        onError: () => {
          setIsLoading(false)
          showToast({
            description: 'Something went wrong.',
            title: 'Error!',
            type: ToastTypes.error,
          })
        },
      },
    )
  }, [guestName, onUpdate, reservationID, showToast, updateReservation])

  const handleRoomSelect = useCallback(
    (val: DefaultRoomProps) => {
      setIsLoading(true)
      setRoomSelectOpen(false)

      postRoomAssign(
        {
          reservationID,
          newRoomID: val.roomID,
          roomTypeID: val.roomTypeID,
        } as any,
        {
          onSuccess: data => {
            console.log(data)
            setIsLoading(false)

            if (data.message && !data.success) {
              showToast({
                description: data.message,
                title: 'Warning!',
                type: ToastTypes.warning,
              })
            } else {
              showToast({
                description: `${guestName} has been assigned.`,
                title: 'Success!',
              })
              onUpdate()
              refetch()
            }
          },
          onError: () => {
            setIsLoading(false)
            showToast({
              description: 'Something went wrong.',
              title: 'Error!',
              type: ToastTypes.error,
            })
          },
        },
      )
    },
    [guestName, onUpdate, postRoomAssign, refetch, reservationID, showToast],
  )

  const checkInPrepare = useCallback(
    (fromRooms: boolean) => {
      // confirm modal
      const params: RouteParamsInterface = {
        confirmParams: {
          title: 'Confirm Check In',
          description: `Are you sure you want to check in ${guestName}?`,
        },
        onClose: (val: boolean) => {
          if (val) {
            handleCheckin(fromRooms)
          }
        },
      }
      navigate(Routes.ConfirmDialog, params)
    },
    [guestName, handleCheckin],
  )

  const handlePress = useCallback(
    (fromRooms: boolean) => {
      if (fromRooms) {
        checkInPrepare(fromRooms)
        return
      }

      switch (action) {
        case 'assign': {
          if (isMoreRoomsThanOne) {
            onOpen()
          } else {
            setRoomSelectOpen(true)
          }
          break
        }

        case 'checkin': {
          checkInPrepare(fromRooms)

          break
        }

        case 'checkout': {
          // confirm modal
          const params: RouteParamsInterface = {
            confirmParams: {
              title: 'Confirm Check Out',
              description: `Are you sure you want to check out ${guestName}?`,
            },
            onClose: (val: boolean) => {
              if (val) {
                handleCheckout()
              }
            },
          }
          navigate(Routes.ConfirmDialog, params)

          break
        }
      }
    },
    [
      action,
      checkInPrepare,
      guestName,
      handleCheckout,
      isMoreRoomsThanOne,
      onOpen,
    ],
  )

  return (
    <>
      <Button
        bg={buttonBg}
        variant={buttonVariant}
        onPress={() => handlePress(false)}
        minWidth="32">
        {isLoading ? <Spinner color={spinnerColor} /> : label}
      </Button>

      <ReservationRoomsList
        isOpen={roomSelectOpen}
        onClose={() => setRoomSelectOpen(false)}
        guestName={reservation.guestName!}
        onSelect={handleRoomSelect}
        reservation={reservation}
        selectedRoom={reservation?.roomID}
        rooms={rooms}
      />

      <AssignRooms
        guestName={reservation.guestName!}
        isOpen={isOpen}
        onClose={onClose}
        reservation={reservation}
        onSelect={handleRoomSelect}
        isLoading={isLoading}
        rooms={rooms}
        isAssignDone={!allRoomsForCheck?.length}
        onCheckInPress={handlePress}
        setRoomTypeID={setRoomTypeID}
      />
    </>
  )
}

export default ReservationStatus

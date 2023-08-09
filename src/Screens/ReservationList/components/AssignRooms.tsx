import React, { memo, useCallback, useMemo, useState } from 'react'
import { Alert, Linking } from 'react-native'
import {
  Actionsheet,
  Box,
  Button,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
  useTheme,
} from 'native-base'

import { ToastTypes } from '../../../Hooks/useToast'
import devices from '../../../Theme/devices'
import { RoomProps } from '../../../models/room'
import { GuestProps, ReservationProps } from '../../../models/reservation'
import { hotelsCloudbedsURL } from '../../../models/constants'

import ToastContent from '../../../Components/ToastContent'
import DropDownButton from '../../../Components/DropDownButton'
import ReservationRoomsList from './ReservationRoomsList'

interface Props {
  guestName: string
  isOpen: boolean
  onClose: () => void
  reservation: ReservationProps & GuestProps & RoomProps
  onSelect: (room: RoomProps) => void
  isLoading: boolean
  rooms: RoomProps[]
  isAssignDone: boolean
  onCheckInPress: (from: boolean) => void
  setRoomTypeID: (roomTypeID: any) => void
}

const AssignRooms = ({
  guestName,
  isOpen,
  onClose,
  reservation,
  onSelect,
  isLoading,
  rooms,
  isAssignDone,
  onCheckInPress,
  setRoomTypeID,
}: Props) => {
  const { colors } = useTheme()
  const {
    isOpen: isOpenRoom,
    onOpen: onOpenRoom,
    onClose: onCloseRoom,
  } = useDisclose()

  const [selectedRoom, setSelectedRoom] = useState<RoomProps>({})

  const handleRoomSelect = useCallback(
    (room: RoomProps) => {
      onCloseRoom()
      onSelect(room)
    },
    [onCloseRoom, onSelect],
  )

  const openNoAvailable = useCallback(() => {
    Alert.alert(
      'No Rooms Available',
      'There are no Rooms matching this room type available for the entire duration of this reservation.\n\nTo explore more advanced Room Assignment options, please visit Cloudbeds on your mobile browser.',
      [
        { style: 'cancel', text: 'Dismiss' },
        {
          onPress: () => Linking.openURL(hotelsCloudbedsURL),
          text: 'Open in Browser',
        },
      ],
    )
  }, [])

  const isDisabled = useMemo(
    () => reservation?.unassignedRooms?.length,
    [reservation?.unassignedRooms?.length],
  )

  const onSetSelectedRoom = useCallback(
    (room: RoomProps) => () => {
      setRoomTypeID(room?.roomTypeID)

      if (isAssignDone && isDisabled && !room?.roomID) {
        openNoAvailable()
      } else {
        setSelectedRoom(room)
        onOpenRoom()
      }
    },
    [isAssignDone, isDisabled, onOpenRoom, openNoAvailable, setRoomTypeID],
  )

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box p={2} w="100%" h={devices.dimensions.height * 0.66}>
            <Box
              pb="4"
              borderBottomWidth="1"
              borderBottomColor={colors.muted['300']}>
              <Text>{guestName}</Text>
              <Text size="lg" fontWeight="600" mt="1">
                Assign Rooms
              </Text>
            </Box>

            <ScrollView
              width="100%"
              pt={4}
              showsVerticalScrollIndicator={false}>
              {isDisabled ? (
                <ToastContent
                  type={ToastTypes.error}
                  description={'This reservation contains unassigned rooms'}
                  p={0}
                  mb={4}
                  w={'100%'}
                />
              ) : null}

              {[
                ...(reservation?.rooms || []),
                ...(reservation?.unassignedRooms || []),
              ]?.map((room, index) => (
                <DropDownButton
                  key={`${room?.roomID}-${index}`}
                  label={room?.roomTypeName}
                  required
                  value={room?.roomName}
                  mb={4}
                  onPress={onSetSelectedRoom(room)}
                />
              ))}
            </ScrollView>
          </Box>

          <Box w="100%" p={2}>
            <Button
              w={'100%'}
              h={12}
              mt={2}
              isDisabled={!!isDisabled}
              onPress={() => onCheckInPress(true)}>
              {isLoading ? <Spinner color={'white'} size={'sm'} /> : 'Check in'}
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      <ReservationRoomsList
        isOpen={isOpenRoom}
        onClose={onCloseRoom}
        guestName={guestName!}
        reservation={reservation}
        onSelect={handleRoomSelect}
        selectedRoom={selectedRoom?.roomID}
        rooms={rooms}
      />
    </>
  )
}

export default memo(AssignRooms)

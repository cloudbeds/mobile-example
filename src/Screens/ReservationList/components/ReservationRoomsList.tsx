import React, { useCallback, useMemo } from 'react'
import {
  Actionsheet,
  Box,
  HStack,
  ScrollView,
  Text,
  useTheme,
} from 'native-base'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import { RoomProps } from '../../../models/room'
import { GuestProps, ReservationProps } from '../../../models/reservation'

interface Props {
  guestName: string
  onSelect: (room: RoomProps) => void
  isOpen: boolean
  onClose: () => void
  reservation: ReservationProps & GuestProps & RoomProps
  selectedRoom: RoomProps['roomID']
  rooms: RoomProps[]
}

const ReservationRoomsList = ({
  reservation,
  guestName,
  onSelect,
  isOpen,
  onClose,
  selectedRoom,
  rooms,
}: Props) => {
  const { colors } = useTheme()

  const alreadyAssigned = useCallback(
    (id: any) =>
      [...(reservation?.assigned || [])]?.find(a => a?.roomID === id),
    [reservation?.assigned],
  )

  let rowStyle = useMemo(() => {
    return { paddingLeft: 8, paddingRight: 16 }
  }, [])

  const renderRooms = useCallback(
    (room: RoomProps, index: number) => {
      return (
        <Actionsheet.Item
          key={`${room.roomID}-${index}`}
          style={rowStyle}
          disabled={
            selectedRoom === room.roomID || !!alreadyAssigned(room.roomID)
          }
          onPress={() => onSelect(room)}>
          <HStack alignItems="center">
            <Box mr="4" width="6">
              {selectedRoom === room.roomID ? (
                <FontAwesomeIcon
                  icon={faCheck as Icon}
                  size={24}
                  color={colors.success['500']}
                />
              ) : null}
            </Box>
            <Text
              size="lg"
              fontWeight={selectedRoom === room.roomID ? '700' : 'normal'}>
              {room.roomName}
            </Text>
          </HStack>
        </Actionsheet.Item>
      )
    },
    [rowStyle, selectedRoom, alreadyAssigned, colors.success, onSelect],
  )

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box
          w="100%"
          p="4"
          mx="4"
          borderBottomWidth="1"
          borderBottomColor={colors.muted['300']}>
          <Text>{guestName}</Text>
          <Text size="lg" fontWeight="600" mt="1">
            Assign Room
          </Text>
        </Box>
        <ScrollView width="100%">
          <Actionsheet.Item
            style={rowStyle}
            onPress={() =>
              onSelect({
                roomID: null,
                roomTypeID: null,
              })
            }>
            <HStack alignItems="center">
              <Box mr="4" width="6">
                {!selectedRoom ? (
                  <FontAwesomeIcon
                    icon={faCheck as Icon}
                    size={24}
                    color={colors.success['500']}
                  />
                ) : null}
              </Box>
              <Text size="lg" fontWeight={!selectedRoom ? '700' : 'normal'}>
                Not Assigned
              </Text>
            </HStack>
          </Actionsheet.Item>
          {rooms.map(renderRooms)}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default ReservationRoomsList

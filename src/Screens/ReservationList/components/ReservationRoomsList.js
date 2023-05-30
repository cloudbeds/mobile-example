import React from 'react'
import { Actionsheet, Box, HStack, ScrollView, Text, useTheme } from 'native-base'

import { useGetRooms } from '../../../Hooks/api'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ReservationRoomsList = ({
  reservationId,
  guestName,
  startDate,
  endDate,
  onSelect,
  isOpen,
  onClose,
  selectedRoom
}) => {
  const { colors } = useTheme()
  const { isLoading, isError, data, refetch } = useGetRooms(
    reservationId,
    {
      startDate,
      endDate,
    },
    {
      enabled: isOpen,
    },
  )

  // fix this
  let rooms = !isLoading && isOpen ? data?.data[0].rooms : []
  let rowStyle = { paddingLeft: 8, paddingRight: 16 }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" p="4" mx="4" borderBottomWidth="1" borderBottomColor={colors.muted['300']}>
          <Text>{guestName}</Text>
          <Text size="lg" fontWeight="600" mt="1">
            Assign Room
          </Text>
        </Box>
        <ScrollView width="100%">
          <Actionsheet.Item style={rowStyle} onPress={() => onSelect({
            roomID: null,
            roomTypeID: null,
          })}>
            <HStack alignItems="center">
              <Box mr="4" width="6">
                {!selectedRoom ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={24}
                    color={colors.success['500']}
                  />
                ) : null}
              </Box>
              <Text size="lg" fontWeight={!selectedRoom ? '700' : 'normal'}>Not Assigned</Text>
            </HStack>
          </Actionsheet.Item>
          {rooms.map(room => (
            <Actionsheet.Item
              key={room.roomID}
              style={rowStyle}
              disabled={selectedRoom === room.roomID}
              onPress={() => onSelect(room)}>
              <HStack alignItems="center">
                <Box mr="4" width="6">
                  {selectedRoom === room.roomID ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      size={24}
                      color={colors.success['500']}
                    />
                  ) : null}
                </Box>
                <Text size="lg" fontWeight={selectedRoom === room.roomID ? '700' : 'normal'}>{room.roomName}</Text>
              </HStack>
            </Actionsheet.Item>
          ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default ReservationRoomsList

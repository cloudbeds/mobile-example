import React from 'react'
import _ from 'lodash'
import {
  Box,
  HStack,
  Text,
  VStack,
  useTheme,
  IconButton,
} from 'native-base'

import ReservationStatusButton from './ReservationStatusButton'
import MessageIcon from '../../../Components/Icons/Message'
import NoteIcon from '../../../Components/Icons/Note'

import Reservations from '../../../Services/Reservations'
import moment from 'moment-timezone'

const ReservationRow = ({ reservation, onUpdate }) => {
  const { colors } = useTheme()
  const roomName = Reservations.getRoomNames(reservation)
  const formatDate = datetime => {
    return moment(datetime).toDate().toLocaleDateString('en', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  return (
    <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
      <HStack mb="2" justifyContent="space-between" alignItems="center">
        <VStack maxWidth="55%">
          <Text size="lg" numberOfLines={2} ellipsizeMode="tail">
            {reservation.guestName}
          </Text>
          <Text size="xs" mt="1">
            {Reservations.getReservationIdentifier(reservation)}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
          <Text lineHeight="sm">
            {formatDate(reservation.startDate)}
            &nbsp;&rarr;&nbsp;
            {formatDate(reservation.endDate)}
          </Text>
          {roomName ? (
            <Text size="xs" mt="1">
              {roomName}
            </Text>
          ) : null}
        </VStack>
      </HStack>
      <HStack>
        <ReservationStatusButton
          reservation={reservation}
          onUpdate={() => onUpdate()}
        />
        <Box style={{ flex: 1 }}>
          <HStack alignItems="center" justifyContent="flex-end">
            {/* {reservation.balance > 0 ? (
              <IconButton p="6" icon={<NoteIcon color={colors.darkText} />} />
            ) : null} */}
            <IconButton p="6" icon={<NoteIcon color={colors.darkText} />} />
            <IconButton p="6" icon={<MessageIcon color={colors.darkText} />} />
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default ReservationRow

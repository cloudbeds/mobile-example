import React, { useCallback } from 'react'
import { Box, HStack, Text, VStack, useTheme, IconButton } from 'native-base'

import {
  DashboardTypes,
  ReservationNotesProps,
  ReservationProps,
} from '../../../models/reservation'
import Reservations from '../../../Services/Reservations'
import { navigate } from '../../../Navigation/navigationUtils'
import Routes from '../../../Navigation/routesNames'

import ReservationStatusButton from './ReservationStatusButton'
// import MessageIcon from '../../../Components/Icons/Message'
import NoteIcon from '../../../Components/Icons/Note'
import StyledBadge from '../../../Components/StyledBadge'
import CreditCardIcon from '../../../Components/Icons/CreditCard'

interface Props {
  reservation: ReservationProps
  reservationNotes: ReservationNotesProps[]
  onUpdate: () => void
  type: DashboardTypes
}

const ReservationRow = ({
  reservation,
  reservationNotes,
  onUpdate,
  type,
}: Props) => {
  const { colors } = useTheme()

  const roomName = Reservations.getRoomNames(reservation)

  const openAddNote = useCallback(() => {
    navigate(Routes.AddNote, { reservation })
  }, [reservation])

  return (
    <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
      <HStack mb="2" justifyContent="space-between">
        <VStack maxWidth="55%">
          <Text size="lg" numberOfLines={2} ellipsizeMode="tail">
            {reservation?.guestName}
          </Text>
          <Text size="xs" mt="1">
            {Reservations.getReservationIdentifier(reservation)}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
          <Text lineHeight="sm">
            {Reservations.formatDate(reservation?.startDate)}
            &nbsp;&rarr;&nbsp;
            {Reservations.formatDate(reservation?.endDate)}
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
          onUpdate={onUpdate}
          type={type}
        />
        <Box flex={1}>
          <HStack alignItems="center" justifyContent="flex-end">
            <Box>
              <IconButton
                p="6"
                icon={<NoteIcon color={colors.darkText} />}
                onPress={openAddNote}
              />
              {reservationNotes?.length ? <StyledBadge /> : null}
            </Box>

            {reservation?.balance ? (
              <Box>
                <IconButton
                  p="3.5"
                  icon={<CreditCardIcon color={colors.darkText} />}
                />
                <StyledBadge dotColor={'error.500'} />
              </Box>
            ) : null}
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default ReservationRow

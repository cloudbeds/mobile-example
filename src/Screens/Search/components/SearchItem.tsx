import React, { memo, useCallback } from 'react'
import { Box, HStack, Text, VStack, useTheme, IconButton } from 'native-base'

import {
  ReservationNotesProps,
  ReservationProps,
  ReservationStatus,
  ReservationStatusColor,
  ReservationStatusName,
  RoomProps,
} from '../../../models/reservation'
import { GuestProps } from '../../../models/guest'
import Reservations from '../../../Services/Reservations'
import { navigate } from '../../../Navigation/navigationUtils'
import { Routes } from '../../../Navigation/routesNames'

import NoteIcon from '../../../Components/Icons/Note'
import StyledBadge from '../../../Components/StyledBadge'
import CreditCardIcon from '../../../Components/Icons/CreditCard'

interface Props {
  reservation: ReservationProps & GuestProps & RoomProps
  reservationNotes: ReservationNotesProps[]
}

const SearchItem = ({ reservation, reservationNotes }: Props) => {
  const { colors } = useTheme()

  const openAddNote = useCallback(() => {
    navigate(Routes.AddNote, { reservation, isGuest: reservation?.isGuest })
  }, [reservation])

  const roomName = Reservations.getRoomNames(reservation)

  const reservationStatus = reservation?.status

  const renderNotes = useCallback(() => {
    return (
      <Box>
        <IconButton
          p="6"
          icon={<NoteIcon color={colors.darkText} />}
          onPress={openAddNote}
        />
        {reservationNotes?.length ? <StyledBadge /> : null}
      </Box>
    )
  }, [colors.darkText, openAddNote, reservationNotes?.length])

  return (
    <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
      <HStack
        justifyContent="space-between"
        alignItems={reservation?.isGuest ? 'center' : 'flex-start'}>
        <VStack maxWidth="55%">
          <Text size="lg" numberOfLines={2} ellipsizeMode="tail">
            {reservation?.guestName}
          </Text>

          {!reservation?.isGuest ? (
            <Text size="xs" mt="1">
              {Reservations.getReservationIdentifier(reservation)}
            </Text>
          ) : null}
        </VStack>

        <VStack alignItems="flex-end">
          {!reservation?.isGuest ? (
            <Text lineHeight="sm">
              {Reservations.formatDate(reservation?.startDate)}
              &nbsp;&rarr;&nbsp;
              {Reservations.formatDate(reservation?.endDate)}
            </Text>
          ) : (
            renderNotes()
          )}

          {roomName ? (
            <Text size="xs" mt="1">
              {roomName}
            </Text>
          ) : null}

          {!reservation?.isGuest ? (
            <HStack alignItems={'center'} mt={1} mb={2}>
              <StyledBadge
                position={'relative'}
                mt={0}
                mr={2}
                width={3}
                height={3}
                dotColor={
                  reservationStatus === ReservationStatus.checked_in ||
                  reservationStatus === ReservationStatus.checked_out
                    ? 'white'
                    : ReservationStatusColor(reservationStatus)
                }
                bgColor={ReservationStatusColor(reservationStatus)}
              />
              <Text size="xs" fontWeight={'500'}>
                {ReservationStatusName(reservationStatus)}
              </Text>
            </HStack>
          ) : null}
        </VStack>
      </HStack>

      <HStack>
        <Box flex={1}>
          <HStack alignItems="center" justifyContent="flex-end">
            {!reservation?.isGuest ? renderNotes() : null}

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

export default memo(SearchItem)

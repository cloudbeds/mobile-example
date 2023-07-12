import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  CloseIcon,
  Input,
  Pressable,
  SearchIcon,
  SectionList,
  useTheme,
  Text,
} from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQuestion, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import {
  getGuestNotes,
  getReservation,
  getReservationNotes,
  useGetGuestsByFilter,
  useRefreshByUser,
  useRefreshOnFocus,
} from '../../Hooks/api'
import { useDimensions } from '../../Hooks'
import {
  ReservationNotesProps,
  ReservationProps,
  RoomStatusTypes,
} from '../../models/reservation'
import {
  GuestNotesProps,
  GuestProps,
  getFilteredGuestsGroupBy,
} from '../../models/guest'
import { ios } from '../../Theme/devices'
import Reservations from '../../Services/Reservations'

import Hero from '../../Components/Hero/Hero'
import Spinner from '../../Components/Spinner'
import SearchItem from './components/SearchItem'

function Search() {
  const { colors } = useTheme()
  const { height, safeArea, headerHeight } = useDimensions()
  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [reservations, setReservations] = useState<ReservationProps[]>([])
  const [reservationNotes, setReservationNotes] = useState<
    { [id: string]: ReservationNotesProps[] }[]
  >([])
  const [guestNotes, setGuestNotes] = useState<
    { [id: string]: GuestNotesProps[] }[]
  >([])

  const guestSearch = Number.isInteger(Number(searchTerm))

  const { isLoading, data, refetch } = useGetGuestsByFilter('search', {
    guestName: guestSearch ? '' : searchTerm,
    reservationID: guestSearch ? searchTerm : '',
    status: RoomStatusTypes.in_house,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  const filteredGuests = useMemo(
    () =>
      isLoading || isRefetchingByUser
        ? []
        : Reservations.parseReservations(data?.data || []),
    [data?.data, isLoading, isRefetchingByUser],
  )

  const guestIDs = useMemo(
    () =>
      loading
        ? []
        : Reservations.filterGuests(
            filteredGuests as ReservationProps[] & GuestProps[],
          ),
    [filteredGuests, loading],
  )

  useRefreshOnFocus(refetch)

  useEffect(() => {
    if (isFocused) {
      getReservationInfo()
      getReservationNotesInfo()
      getGuestNotesInfo()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGuests, isFocused])

  const getReservationInfo = useCallback(async () => {
    if (!reservations?.length) {
      setLoading(true)
    }

    const res: ReservationProps[] = await Promise.all(
      filteredGuests.map(async guest => {
        return await getReservation({ reservationID: guest.reservationID })
      }),
    )

    setLoading(false)
    setReservations(res)
  }, [filteredGuests, reservations?.length])

  const getReservationNotesInfo = useCallback(async () => {
    const reservationNotes = await Promise.all(
      filteredGuests.map(async guest => {
        return {
          [guest.reservationID]: await getReservationNotes({
            reservationID: guest.reservationID,
          }),
        }
      }),
    )

    setReservationNotes(reservationNotes)
  }, [filteredGuests])

  const getGuestNotesInfo = useCallback(async () => {
    const guestNotes = await Promise.all(
      guestIDs.map(async guest => {
        return {
          [guest.guestID]: await getGuestNotes({
            guestID: guest.guestID,
          }),
        }
      }),
    )

    setGuestNotes(guestNotes)
  }, [guestIDs])

  const guests = [...reservations, ...guestIDs]
  const filteredGuestsGroup = getFilteredGuestsGroupBy(
    guests as ReservationProps[] & GuestProps[],
  )

  const filteredReservationNote = useCallback(
    (reservationID: string) => {
      const notes = reservationNotes?.find(note => note[reservationID])?.[
        reservationID
      ]
      return notes || []
    },
    [reservationNotes],
  )

  const filteredGuestNote = useCallback(
    (guestID: string) => {
      const notes = guestNotes?.find(note => note[guestID])?.[guestID]
      return notes || []
    },
    [guestNotes],
  )

  const handleSearch = useCallback(() => {
    setReservations([])
    refetchByUser()
  }, [refetchByUser])

  const keyExtractor = useCallback(
    (item: GuestProps, index: number) => `${item.guestID}-${index}`,
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: GuestProps & ReservationProps }) => (
      <SearchItem
        reservation={item}
        reservationNotes={
          item?.isGuest
            ? filteredGuestNote(item?.guestID?.toString()!)
            : filteredReservationNote(item?.reservationID)
        }
      />
    ),
    [filteredGuestNote, filteredReservationNote],
  )

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) =>
      title ? (
        <Box bg={'fog.600'} py={2} px={4}>
          <Text fontWeight={'600'} color="white">
            {title}
          </Text>
        </Box>
      ) : null,
    [],
  )

  const renderPlaceholder = useCallback(
    () => (
      <Box alignItems={'center'} justifyContent={'center'}>
        <Box
          w={110}
          h={110}
          borderRadius={55}
          borderWidth={1}
          borderColor={'info.400'}
          alignItems={'center'}
          justifyContent={'center'}>
          <FontAwesomeIcon
            icon={faSearch as Icon}
            size={38}
            color={colors.info['400']}
          />
        </Box>

        <Text textAlign={'center'} fontWeight={'600'} color="info.400" mt={8}>
          Search by Reservation ID or Guest Name
        </Text>
      </Box>
    ),
    [colors.info],
  )

  const renderNoResults = useCallback(
    () => (
      <Box alignItems={'center'} justifyContent={'center'}>
        <Box
          w={90}
          h={90}
          borderRadius={45}
          borderWidth={1}
          borderColor={'info.600'}
          alignItems={'center'}
          justifyContent={'center'}>
          <FontAwesomeIcon
            icon={faQuestion as Icon}
            size={38}
            color={colors.info['600']}
          />
        </Box>

        <Text textAlign={'center'} fontWeight={'600'} color="info.600" mt={8}>
          No Results Found
        </Text>
      </Box>
    ),
    [colors.info],
  )

  const renderListEmptyComponent = useCallback(
    () => (
      <Box alignItems={'center'} justifyContent={'center'} mt={20}>
        {loading || isLoading || isRefetchingByUser ? (
          <Spinner color={colors.info['400']} size={66} />
        ) : !searchTerm && !filteredGuests?.length ? (
          renderPlaceholder()
        ) : !filteredGuests?.length ? (
          renderNoResults()
        ) : null}
      </Box>
    ),
    [
      colors.info,
      filteredGuests?.length,
      isLoading,
      isRefetchingByUser,
      loading,
      renderNoResults,
      renderPlaceholder,
      searchTerm,
    ],
  )

  return (
    <Box flex={1} bg="white">
      <Hero image>
        <Box p={4} mt={12}>
          <Input
            bg={'white'}
            _focus={{ backgroundColor: 'white' }}
            h={52}
            variant={'rounded'}
            InputLeftElement={
              <Box ml={4}>
                <SearchIcon size={23} color={colors.info['900']} />
              </Box>
            }
            InputRightElement={
              searchTerm ? (
                <Pressable mr={4} onPress={() => setSearchTerm('')}>
                  <CloseIcon size={14} color={colors.info['700']} />
                </Pressable>
              ) : (
                <></>
              )
            }
            placeholder="Search"
            fontSize={16}
            returnKeyType="search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
        </Box>

        <Box height={height - headerHeight - safeArea.bottom} bg="white">
          <SectionList
            sections={filteredGuestsGroup}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderListEmptyComponent}
            ListFooterComponent={<Box height={ios ? 260 : 220} />}
            onEndReached={() => {}}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => {}}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Hero>
    </Box>
  )
}

export default Search

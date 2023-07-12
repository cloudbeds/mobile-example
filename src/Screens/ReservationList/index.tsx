import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, useTheme, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'

import {
  getReservation,
  getReservationNotes,
  useGetReservations,
  useRefreshByUser,
  useRefreshOnFocus,
} from '../../Hooks/api'
import { RouteProps } from '../../Navigation/types'
import {
  DashboardTypes,
  GuestProps,
  ReservationNotesProps,
  ReservationProps,
  RoomProps,
} from '../../models/reservation'
import Reservations from '../../Services/Reservations'

import ReservationRow from './components/ReservationRow'
import EmptyView from '../../Components/List/EmptyView'
import ReservationRowSkeleton from './components/ReservationRowSkeleton'
import Layout from '../../Components/Layout'

function ReservationList() {
  const route = useRoute<RouteProps>()
  const { colors } = useTheme()

  const { title, emptyText, fetchParams, type } = route.params

  const [loading, setLoading] = useState(false)
  const [detailedReservations, setReservations] = useState<ReservationProps[]>(
    [],
  )
  const [reservationNotes, setReservationNotes] = useState<
    { [id: string]: ReservationNotesProps[] }[]
  >([])

  const { isLoading, data, refetch } = useGetReservations(title, {
    ...fetchParams,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  let reservations: ReservationProps[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  )

  useRefreshOnFocus(refetch)

  useEffect(() => {
    getReservationInfo()
    getReservationNotesInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations])

  const getReservationInfo = useCallback(async () => {
    setLoading(true)

    const deReservations: ReservationProps[] = await Promise.all(
      reservations.map(async guest => {
        return await getReservation({ reservationID: guest.reservationID })
      }),
    )

    setLoading(false)
    setReservations(deReservations)
  }, [reservations])

  const getReservationNotesInfo = useCallback(async () => {
    const reservationNotes = await Promise.all(
      reservations.map(async guest => {
        return {
          [guest.reservationID]: await getReservationNotes({
            reservationID: guest.reservationID,
          }),
        }
      }),
    )

    setReservationNotes(reservationNotes)
  }, [reservations])

  const filteredReservationNote = useCallback(
    (reservationID: string) => {
      const notes = reservationNotes?.find(note => note[reservationID])?.[
        reservationID
      ]
      return notes || []
    },
    [reservationNotes],
  )

  const renderListEmpty = useCallback(() => {
    return (
      <EmptyView
        text={emptyText!}
        iconColor={
          type === DashboardTypes.arrivals
            ? colors.success['500']
            : colors.info['600']
        }
        type={type!}
      />
    )
  }, [colors.info, colors.success, emptyText, type])

  const keyExtractor = useCallback(
    (item: ReservationProps & GuestProps & RoomProps, index: number) =>
      `${item.subReservationID}-${index}`,
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: ReservationProps }) => (
      <ReservationRow
        reservation={item}
        reservationNotes={filteredReservationNote(item?.reservationID)}
        onUpdate={refetch}
        type={type!}
      />
    ),
    [filteredReservationNote, refetch, type],
  )

  const renderListEmptyComponent = useCallback(
    () =>
      isLoading || loading ? (
        <VStack key={'loading'}>
          <ReservationRowSkeleton key={1} />
          <ReservationRowSkeleton key={2} />
          <ReservationRowSkeleton key={3} />
        </VStack>
      ) : (
        renderListEmpty()
      ),
    [isLoading, loading, renderListEmpty],
  )

  return (
    <Layout noScroll noPadding bg={'white'}>
      <FlatList
        height={'100%'}
        bg={'white'}
        data={Reservations.parseReservations(detailedReservations)}
        keyExtractor={keyExtractor}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </Layout>
  )
}

export default ReservationList

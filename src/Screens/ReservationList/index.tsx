import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InteractionManager } from 'react-native'
import { FlatList, useTheme, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

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
import { RootState } from '../../store/store'
import { changeReservations } from '../../store/slices/reservationSlice'

import ReservationRow from './components/ReservationRow'
import EmptyView from '../../Components/List/EmptyView'
import ReservationRowSkeleton from './components/ReservationRowSkeleton'
import Layout from '../../Components/Layout'

function ReservationList() {
  const dispatch = useDispatch()
  const { reservations: storedReservations } = useSelector(
    (state: RootState) => state.reservation,
  )
  const route = useRoute<RouteProps>()
  const { colors } = useTheme()

  const { title, emptyText, fetchParams, type } = route.params

  let pageNumber = useRef(1)

  const [loading, setLoading] = useState(false)
  const [detailedReservations, setReservations] = useState<ReservationProps[]>(
    [],
  )
  const [reservationNotes, setReservationNotes] = useState<
    { [id: string]: ReservationNotesProps[] }[]
  >([])

  const { isLoading, data, refetch } = useGetReservations(
    title! + pageNumber.current,
    {
      ...fetchParams,
      pageNumber: pageNumber.current,
      pageSize: 100,
    },
    {
      keepPreviousData: true,
    },
  )
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  let reservations: ReservationProps[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  )

  const refreshFetch = useCallback(() => {
    pageNumber.current = 1

    refetchByUser()
  }, [refetchByUser])

  const refetchs = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      pageNumber.current = 1
      refetch()
    })
  }, [refetch])

  const endReached = useCallback(() => {
    if (reservations?.length) {
      pageNumber.current = pageNumber.current + 1
      refetch()
    }
  }, [refetch, reservations?.length])

  useRefreshOnFocus(refetchs)

  useEffect(() => {
    saveReservations()
    getReservationNotesInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations])

  useEffect(() => {
    getReservationInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedReservations])

  const saveReservations = useCallback(async () => {
    setLoading(true)

    const deReservations: ReservationProps[] = await Promise.all(
      reservations.map(async guest => {
        return await getReservation({ reservationID: guest.reservationID })
      }),
    )

    setLoading(false)

    dispatch(changeReservations(deReservations))
  }, [dispatch, reservations])

  const getReservationInfo = useCallback(async () => {
    setLoading(true)

    const deReservations: ReservationProps[] = reservations?.map(res => {
      const reservation = storedReservations?.find(
        s => s?.reservationID === res?.reservationID,
      )

      return { ...res, ...(reservation || {}) }
    })

    setLoading(false)
    setReservations(
      Reservations.parseReservations([
        ...deReservations,
        ...detailedReservations,
      ]),
    )
  }, [detailedReservations, reservations, storedReservations])

  const getReservationNotesInfo = useCallback(async () => {
    const notes = await Promise.all(
      reservations.map(async guest => {
        return {
          [guest.reservationID]: await getReservationNotes({
            reservationID: guest.reservationID,
          }),
        }
      }),
    )

    setReservationNotes([...notes, ...reservationNotes])
  }, [reservationNotes, reservations])

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
    ({ item }: { item: any }) => (
      <ReservationRow
        reservation={item}
        reservations={detailedReservations}
        reservationNotes={filteredReservationNote(item?.reservationID)}
        onUpdate={refetchs}
        type={type!}
      />
    ),
    [detailedReservations, filteredReservationNote, refetchs, type],
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
        data={detailedReservations}
        keyExtractor={keyExtractor}
        onRefresh={refreshFetch}
        refreshing={isRefetchingByUser}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
        onEndReached={endReached}
      />
    </Layout>
  )
}

export default ReservationList

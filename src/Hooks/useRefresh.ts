import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/store'
import {
  getReservation,
  useGetHousekeepers,
  useGetReservations,
  useGetRoomTypes,
  useRefreshByUser,
} from './api'
import { useProgress } from '../Components/ProgressHud/ProgressContext'
import { ReservationProps } from '../models/reservation'
import {
  changeReservations,
  changeRoomTypes,
} from '../store/slices/reservationSlice'
import { RoomTypesProps } from '../models/room'
import Reservations from '../Services/Reservations'
import { useInterval } from '.'
import { refreshTime } from '../models/constants'
import {
  HousekeepersProps,
  filterHousekeepersByID,
} from '../models/housekeeping'
import { changeHousekeepers } from '../store/slices/deviceSlice'

export default function useRefresh(enabled: boolean) {
  const dispatch = useDispatch()
  const { reservations: storedReservations } = useSelector(
    (state: RootState) => state.reservation,
  )

  const { showProgress, hideProgress } = useProgress()
  let showLoader = useRef(true)
  const [loading, setLoading] = useState(false)

  const [startInterval, stopInterval] = useInterval()

  let allReservations = useRef<ReservationProps[]>([])
  let pageNumber = useRef(1)

  let allRoomTypes = useRef<RoomTypesProps[]>([])
  let pageNumberRoomTypes = useRef(1)

  let allHousekeepers = useRef<HousekeepersProps[]>([])
  let pageNumberHousekeepers = useRef(1)

  const { isLoading, data, refetch } = useGetReservations(
    { page: pageNumber?.current },
    {
      includeGuestsDetails: true,
      pageNumber: pageNumber?.current,
      pageSize: 1000,
    },
    {
      enabled,
      keepPreviousData: true,
    },
  )

  const {
    isLoading: isLoadingRoomTypes,
    data: dataRoomTypes,
    refetch: refetchRoomTypes,
  } = useGetRoomTypes(
    { page: pageNumberRoomTypes?.current },
    { pageNumber: pageNumberRoomTypes?.current, pageSize: 1000 },
    {
      enabled,
      keepPreviousData: true,
    },
  )

  const {
    isLoading: isLoadingHousekeepers,
    data: dataHousekeepers,
    refetch: refetchHousekeepers,
  } = useGetHousekeepers(
    { page: pageNumberHousekeepers?.current },
    { pageNumber: pageNumberHousekeepers?.current, pageSize: 1000 },
    {
      enabled,
      keepPreviousData: true,
    },
  )

  const refetchs = useCallback(() => {
    refetch()
    refetchRoomTypes()
    refetchHousekeepers()
  }, [refetch, refetchHousekeepers, refetchRoomTypes])

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetchs)

  let reservations: ReservationProps[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  )

  allReservations.current = Reservations.parseReservations([
    ...allReservations?.current,
    ...reservations,
  ])

  let roomTypes: RoomTypesProps[] = useMemo(
    () => (isLoadingRoomTypes ? [] : dataRoomTypes?.data || []),
    [dataRoomTypes?.data, isLoadingRoomTypes],
  )

  allRoomTypes.current = Reservations.filterRoomTypesByID([
    ...allRoomTypes?.current,
    ...roomTypes,
  ])

  let housekeepers: HousekeepersProps[] = useMemo(
    () => (isLoadingHousekeepers ? [] : dataHousekeepers?.data || []),
    [dataHousekeepers?.data, isLoadingHousekeepers],
  )

  allHousekeepers.current = filterHousekeepersByID([
    ...allHousekeepers?.current,
    ...housekeepers,
  ])

  useEffect(() => {
    if (
      isLoading ||
      isLoadingRoomTypes ||
      isLoadingHousekeepers ||
      isRefetchingByUser ||
      loading
    ) {
      showProgress('Loading...')
    } else {
      hideProgress()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoading,
    isLoadingRoomTypes,
    isRefetchingByUser,
    isLoadingHousekeepers,
    loading,
  ])

  useEffect(() => {
    if (reservations?.length) {
      pageNumber.current = pageNumber.current + 1
      refetch()
    } else {
      getReservationInfo()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations])

  useEffect(() => {
    if (roomTypes?.length) {
      pageNumberRoomTypes.current = pageNumberRoomTypes.current + 1
      refetchRoomTypes()
    } else {
      storeRoomTypes()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypes])

  useEffect(() => {
    if (housekeepers?.length) {
      pageNumberHousekeepers.current = pageNumberHousekeepers.current + 1
      refetchHousekeepers()
    } else {
      storeHousekeepers()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housekeepers])

  const storeRoomTypes = useCallback(() => {
    dispatch(changeRoomTypes(allRoomTypes.current || []))
  }, [dispatch])

  const getReservationInfo = useCallback(async () => {
    if (showLoader.current) {
      setLoading(true)
    }

    const deReservations: ReservationProps[] = await Promise.all(
      allReservations.current.map(async guest => {
        return await getReservation({ reservationID: guest.reservationID })
      }),
    )

    if (!isLoading && !isLoadingRoomTypes && !isRefetchingByUser) {
      setLoading(false)
    }

    dispatch(changeReservations(deReservations))
  }, [dispatch, isLoading, isLoadingRoomTypes, isRefetchingByUser])

  const storeHousekeepers = useCallback(() => {
    dispatch(changeHousekeepers(allHousekeepers.current || []))
  }, [dispatch])

  const refetchAllReservations = useCallback(() => {
    showLoader.current = false

    pageNumber.current = 1
    pageNumberRoomTypes.current = 1
    pageNumberHousekeepers.current = 1

    refetchByUser()
  }, [refetchByUser])

  const clearTimers = useCallback(() => {
    stopInterval()
  }, [stopInterval])

  const startCycling = useCallback(() => {
    startInterval(() => {
      refetchAllReservations()
    }, refreshTime)
  }, [refetchAllReservations, startInterval])

  useEffect(() => {
    startCycling()

    return () => {
      clearTimers()
    }
  }, [clearTimers, startCycling])

  return { isRefetchingByUser, storedReservations, refetchAllReservations }
}

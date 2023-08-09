import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/store'
import { useGetHousekeepers, useGetRoomTypes, useRefreshByUser } from './api'
import { useProgress } from '../Components/ProgressHud/ProgressContext'
import { changeRoomTypes } from '../store/slices/reservationSlice'
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

  const [startInterval, stopInterval] = useInterval()

  let allRoomTypes = useRef<RoomTypesProps[]>([])
  let pageNumberRoomTypes = useRef(1)

  let allHousekeepers = useRef<HousekeepersProps[]>([])
  let pageNumberHousekeepers = useRef(1)

  const {
    isLoading: isLoadingRoomTypes,
    data: dataRoomTypes,
    refetch: refetchRoomTypes,
  } = useGetRoomTypes(
    { page: pageNumberRoomTypes?.current },
    { pageNumber: pageNumberRoomTypes?.current, pageSize: 100 },
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
    { pageNumber: pageNumberHousekeepers?.current, pageSize: 100 },
    {
      enabled,
      keepPreviousData: true,
    },
  )

  const refetchs = useCallback(() => {
    refetchRoomTypes()
    refetchHousekeepers()
  }, [refetchHousekeepers, refetchRoomTypes])

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetchs)

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
    if (isLoadingRoomTypes || isLoadingHousekeepers || isRefetchingByUser) {
      showProgress('Loading...')
    } else {
      hideProgress()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingRoomTypes, isRefetchingByUser, isLoadingHousekeepers])

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

  const storeHousekeepers = useCallback(() => {
    dispatch(changeHousekeepers(allHousekeepers.current || []))
  }, [dispatch])

  const refetchAllReservations = useCallback(() => {
    showLoader.current = false

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

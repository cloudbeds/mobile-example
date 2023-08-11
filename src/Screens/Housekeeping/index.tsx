import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { InteractionManager } from 'react-native'
import { Box, FlatList, Text, VStack } from 'native-base'
import { useSelector } from 'react-redux'

import { navigate } from '../../Navigation/navigationUtils'
import Routes from '../../Navigation/routesNames'
import { useDimensions } from '../../Hooks'
import {
  useGetHousekeepingStatus,
  useRefreshByUser,
  useRefreshOnFocus,
} from '../../Hooks/api'
import { ios } from '../../Theme/devices'
import images from '../../Theme/images'
import { FilterTypes, HousekeepingStatusProps } from '../../models/housekeeping'
import Reservations from '../../Services/Reservations'
import { RootState } from '../../store/store'

import ListSection from '../../Components/List/ListSection'
import Hero from '../../Components/Hero/Hero'
import FilterSection from './components/FilterSection'
import HousekeepingItem from './components/HousekeepingItem'
import ReservationRowSkeleton from '../ReservationList/components/ReservationRowSkeleton'

function Houskeeping() {
  const { housekeepingFilters } = useSelector(
    (state: RootState) => state.device,
  )
  const { reservations: storedReservations } = useSelector(
    (state: RootState) => state.reservation,
  )

  const { height, safeArea, headerHeight } = useDimensions()

  let pageNumber = useRef(1)

  const [search, setSearch] = useState('')
  const [allHousekeepings, setAllHousekeepings] = useState<
    HousekeepingStatusProps[]
  >([])

  const { isLoading, data, refetch } = useGetHousekeepingStatus(
    { page: pageNumber.current },
    {
      pageNumber: pageNumber.current,
      pageSize: 100,
    },
    {
      keepPreviousData: true,
    },
  )
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  let housekeepings: HousekeepingStatusProps[] = useMemo(
    () => (isLoading ? [] : data?.data || []),
    [data?.data, isLoading],
  )

  useEffect(() => {
    const newKeepings = [...housekeepings, ...allHousekeepings]
    setAllHousekeepings(Reservations.filterRooms(newKeepings))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housekeepings])

  const roomTypes = useMemo(() => {
    const types = allHousekeepings?.map(h => ({
      label: h?.roomTypeName! || 'N/A',
      value: h?.roomTypeID! || null,
    }))
    return Reservations.filterRoomTypes(types)
  }, [allHousekeepings])

  const refetchs = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      pageNumber.current = 1
      refetch()
    })
  }, [refetch])

  useRefreshOnFocus(refetchs)

  const refetchAll = useCallback(() => {
    pageNumber.current = 1
    refetchByUser()
  }, [refetchByUser])

  const endReached = useCallback(() => {
    if (housekeepings?.length) {
      pageNumber.current = pageNumber.current + 1
      refetch()
    }
  }, [housekeepings?.length, refetch])

  const itemPress = useCallback(
    (housekeepingStatus: HousekeepingStatusProps) => {
      navigate(Routes.Rooms, { housekeepingStatus })
    },
    [],
  )

  const filteredItems = useMemo(() => {
    let filtered: HousekeepingStatusProps[] = [...allHousekeepings]

    if (!housekeepingFilters?.[FilterTypes.Type]?.includes('all')) {
      filtered = filtered?.filter(f =>
        housekeepingFilters?.[FilterTypes.Type]?.includes(f?.roomTypeID),
      )
    }

    if (!housekeepingFilters?.[FilterTypes.Status]?.includes('all')) {
      filtered = filtered?.filter(f =>
        housekeepingFilters?.[FilterTypes.Status]?.includes(f?.roomOccupied),
      )
    }

    if (!housekeepingFilters?.[FilterTypes.Condition]?.includes('all')) {
      filtered = filtered?.filter(f =>
        housekeepingFilters?.[FilterTypes.Condition]?.includes(
          f?.roomCondition,
        ),
      )
    }

    if (!housekeepingFilters?.[FilterTypes.Assigned]?.includes('all')) {
      filtered = filtered?.filter(f =>
        housekeepingFilters?.[FilterTypes.Assigned]?.includes(f?.housekeeperID),
      )
    }

    if (!housekeepingFilters?.[FilterTypes.Frontdesk]?.includes('all')) {
      filtered = filtered?.filter(f =>
        housekeepingFilters?.[FilterTypes.Frontdesk]?.includes(
          f?.frontdeskStatus,
        ),
      )
    }

    return filtered?.filter(f =>
      f?.roomName?.toLowerCase()?.includes(search?.toLowerCase()),
    )
  }, [housekeepingFilters, allHousekeepings, search])

  const renderListEmpty = useCallback(() => {
    return (
      <Text textAlign={'center'} fontWeight={'600'} color="info.600" mt={12}>
        No Results Found
      </Text>
    )
  }, [])

  const keyExtractor = useCallback(
    (item: HousekeepingStatusProps, index: number) => `${item.roomID}-${index}`,
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: HousekeepingStatusProps }) => (
      <HousekeepingItem
        item={item}
        reservations={storedReservations}
        onPress={() => itemPress(item)}
      />
    ),
    [itemPress, storedReservations],
  )

  const renderListEmptyComponent = useCallback(
    () =>
      isLoading || isRefetchingByUser ? (
        <VStack key={'loading'}>
          <ReservationRowSkeleton key={1} />
          <ReservationRowSkeleton key={2} />
          <ReservationRowSkeleton key={3} />
        </VStack>
      ) : (
        renderListEmpty()
      ),
    [isLoading, isRefetchingByUser, renderListEmpty],
  )

  const renderListHeaderComponent = useCallback(
    () => (
      <Box>
        <Box px={4} py={2.5}>
          <Text size="lg" fontWeight="600">
            {filteredItems?.length}{' '}
            {filteredItems?.length === 1 ? 'Result' : 'Results'}
          </Text>
        </Box>

        <ListSection>Rooms</ListSection>
      </Box>
    ),
    [filteredItems?.length],
  )

  return (
    <Box flex={1} bg="white">
      <Hero image source={images.HousekeepingBg} height={180} mask>
        <Text color="white" size="lg" fontWeight="600" p="6" mb="2">
          Housekeeping
        </Text>

        <Box
          height={height - headerHeight - safeArea.bottom - (ios ? 160 : 120)}
          bg="white">
          <FilterSection
            search={search}
            setSearch={setSearch}
            roomTypes={roomTypes}
          />

          <FlatList
            height={'100%'}
            bg={'white'}
            data={filteredItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            onRefresh={refetchAll}
            refreshing={isRefetchingByUser}
            onEndReached={endReached}
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            ListHeaderComponent={
              filteredItems?.length ? renderListHeaderComponent : <></>
            }
            ListFooterComponent={<Box h={12} />}
          />
        </Box>
      </Hero>
    </Box>
  )
}

export default memo(Houskeeping)

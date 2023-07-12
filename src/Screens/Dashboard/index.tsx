import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Box, Text, VStack, ScrollView, HStack } from 'native-base'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import moment from 'moment-timezone'

import {
  GenericNavigationProps,
  RouteParamsInterface,
} from '../../Navigation/types'
import Routes from '../../Navigation/routesNames'
import { useDimensions } from '../../Hooks'
import {
  useGetDashboard,
  useRefreshByUser,
  useRefreshOnFocus,
} from '../../Hooks/api'
import colors from '../../Theme/colors'
import { ios } from '../../Theme/devices'
import { DashboardTypes, ReservationStatus } from '../../models/reservation'

import ListItem from '../../Components/List/ListItem'
import Hero from '../../Components/Hero/Hero'
import SegmentToggle from '../../Components/SegmentToggle/SegmentToggle'

function Dashboard() {
  const navigation = useNavigation<GenericNavigationProps>()
  const { height, safeArea, headerHeight } = useDimensions()

  const [segment, setSegment] = useState('Today')
  const [filterDate, setFilterDate] = useState(moment().format('YYYY-MM-DD'))

  const { data, refetch } = useGetDashboard(filterDate)
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  const response = data ? data.data : {}
  const { arrivals, departures, inHouse, percentageOccupied } = response

  useRefreshOnFocus(refetch)

  let dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  let dateParts = new Intl.DateTimeFormat('en-US', dateOptions).formatToParts(
    moment(filterDate).toDate(),
  )
  let weekDay = dateParts?.find(part => part.type === 'weekday')?.value
  let day = dateParts?.find(part => part.type === 'day')?.value
  let month = dateParts?.find(part => part.type === 'month')?.value

  const handleToggleSelect = (val: string) => {
    if (val === 'Today') {
      setFilterDate(moment().format('YYYY-MM-DD'))
    } else {
      setFilterDate(moment().add(1, 'day').format('YYYY-MM-DD'))
    }
    setSegment(val)
  }

  const goToNext = useCallback(
    (type: DashboardTypes) => () => {
      let params: RouteParamsInterface = {
        title: `${arrivals} Arrivals`,
        emptyText: 'All arrivals have been checked in!',
        fetchParams: {
          status: `${ReservationStatus.not_confirmed},${ReservationStatus.confirmed}`,
          checkInFrom: filterDate,
          checkInTo: filterDate,
          includeGuestsDetails: true,
        },
        type,
      }

      if (type === DashboardTypes.departures) {
        params = {
          title: `${departures} Departures`,
          emptyText: 'All departures have been checked out!',
          fetchParams: {
            status: ReservationStatus.checked_in,
            checkOutFrom: filterDate,
            checkOutTo: filterDate,
            includeGuestsDetails: true,
          },
          type,
        }
      } else if (type === DashboardTypes.inHouse) {
        params = {
          title: `${inHouse} In-House`,
          emptyText: 'There are no Stayovers.',
          fetchParams: {
            status: ReservationStatus.checked_in,
            includeGuestsDetails: true,
          },
          type,
        }
      }

      navigation.navigate(Routes.ReservationList, params)
    },
    [arrivals, departures, filterDate, inHouse, navigation],
  )

  return (
    <Box flex={1} bg="white">
      <Hero image>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
              colors={[ios ? 'white' : colors.primary['500']]}
              tintColor={ios ? 'white' : colors.primary['500']}
            />
          }>
          <HStack p={4}>
            <Box flex="1">
              <Box>
                <Text size="lg" color="white">
                  {weekDay}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="6xl"
                  fontWeight="700"
                  lineHeight="xs"
                  color="white">
                  {day}
                </Text>
              </Box>
              <Box>
                <Text size="lg" fontWeight="600" mt="-3" color="white">
                  {month}
                </Text>
              </Box>
            </Box>
            <Box>
              <AnimatedCircularProgress
                size={118}
                width={12}
                rotation={0}
                fill={percentageOccupied}
                tintColor={colors.tertiary['500']}
                backgroundColor={colors.muted['100']}>
                {() => (
                  <>
                    <Text color="white" fontSize="3xl" fontWeight="600">
                      {percentageOccupied}%
                    </Text>
                    <Text color="white" size="xs" fontWeight="600">
                      Occupancy
                    </Text>
                  </>
                )}
              </AnimatedCircularProgress>
            </Box>
          </HStack>

          <VStack
            space={0}
            height={height - 268 - headerHeight - safeArea.bottom}
            bg="white">
            <SegmentToggle selected={segment} onSelect={handleToggleSelect} />

            <ListItem
              onPress={goToNext(DashboardTypes.arrivals)}
              leftContent={
                <Text size="lg" fontWeight="700">
                  {arrivals}
                </Text>
              }
              bodyContent={
                <Text size="md" fontWeight="600">
                  Arrivals
                </Text>
              }
              rightContent={undefined}
              route={undefined}
            />

            <ListItem
              onPress={goToNext(DashboardTypes.departures)}
              leftContent={
                <Text size="lg" fontWeight="700">
                  {departures}
                </Text>
              }
              bodyContent={
                <Text size="md" fontWeight="600">
                  Departures
                </Text>
              }
              rightContent={undefined}
              route={undefined}
            />

            <ListItem
              onPress={goToNext(DashboardTypes.inHouse)}
              leftContent={
                <Text size="lg" fontWeight="700">
                  {inHouse}
                </Text>
              }
              bodyContent={
                <Text size="md" fontWeight="600">
                  In-House
                </Text>
              }
              rightContent={undefined}
              route={undefined}
            />
          </VStack>
        </ScrollView>
      </Hero>
    </Box>
  )
}

export default Dashboard

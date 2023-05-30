import React, { useState } from 'react'
import { Box, Text, VStack, ScrollView, Image, HStack } from 'native-base'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import ListItem from '../../Components/List/ListItem'
import Hero from '../../Components/Hero/Hero'
import SegmentToggle from '../../Components/SegmentToggle/SegmentToggle'

import {
  useGetDashboard,
  useRefreshByUser,
  useRefreshOnFocus,
} from '../../Hooks/api'
import { RefreshControl } from 'react-native'
import moment from 'moment-timezone'
import colors from '../../Theme/colors'

function Dashboard({ navigation }) {
  const [segment, setSegment] = useState('Today')
  const [filterDate, setFilterDate] = useState(moment().format('YYYY-MM-DD'))
  const { isLoading, isError, data, refetch } = useGetDashboard(filterDate)
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  const response = data ? data.data : {}
  const { arrivals, departures, inHouse, percentageOccupied } = response

  useRefreshOnFocus(refetch)

  let dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  let dateParts = new Intl.DateTimeFormat('en-US', dateOptions).formatToParts(
    moment(filterDate).toDate(),
  )
  let weekDay = dateParts.find(part => part.type === 'weekday').value
  let day = dateParts.find(part => part.type === 'day').value
  let month = dateParts.find(part => part.type === 'month').value

  const handleToggleSelect = val => {
    if (val === 'Today') {
      setFilterDate(moment().format('YYYY-MM-DD'))
    } else {
      setFilterDate(moment().add(1, 'day').format('YYYY-MM-DD'))
    }
    setSegment(val)
  }

  return (
    <Box flex="1">
      <Image
        source={require('../../Assets/hero-background.png')}
        alt="Alternate Text"
        style={{ position: 'absolute' }}
        width="100%"
        height="50%"
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }>
        <Hero>
          <HStack>
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
                    <Text color="white" size="xs" fontWeight="600">Occupancy</Text>
                  </>
                )}
              </AnimatedCircularProgress>
            </Box>
          </HStack>
        </Hero>
        <VStack space={0} bg="white">
           <SegmentToggle
            selected={segment}
            onSelect={val => handleToggleSelect(val)}
          />
          <ListItem
            onPress={() => {
              navigation.navigate({
                name: 'ReservationList',
                params: {
                  title: `${arrivals} Arrivals`,
                  emptyText: 'All arrivals have been checked in!',
                  fetchParams: {
                    status: 'not_confirmed,confirmed',
                    checkInFrom: filterDate,
                    checkInTo: filterDate,
                    includeGuestsDetails: true
                  },
                },
              })
            }}
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
          />
          <ListItem
            onPress={() => {
              navigation.navigate({
                name: 'ReservationList',
                params: {
                  title: `${departures} Departures`,
                  emptyText: 'All departures have been checked out!',
                  fetchParams: {
                    status: 'checked_in',
                    checkOutFrom: filterDate,
                    checkOutTo: filterDate,
                    includeGuestsDetails: true
                  }
                }
              })
            }}
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
          />
          <ListItem
            onPress={() => {
              navigation.navigate({
                name: 'ReservationList',
                params: {
                  title: `${inHouse} Stayovers`,
                  emptyText: 'No Stayovers',
                  fetchParams: {
                    status: 'checked_in',
                    includeGuestsDetails: true
                    // checkInFrom: filterDate,
                    // checkOutFrom: filterDate,
                  }
                }
              })
            }}
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
          />
          <Box bg="white" height="300" />
        </VStack>
      </ScrollView>
    </Box>
  )
}

export default Dashboard

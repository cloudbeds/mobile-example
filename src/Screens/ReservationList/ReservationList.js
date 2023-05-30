import React from 'react'
import { FlatList, useTheme, VStack } from 'native-base'

import ReservationRow from './components/ReservationRow'
import EmptyView from '../../Components/List/EmptyView'
import {
  useGetReservations,
  useRefreshByUser,
} from '../../Hooks/api'
import ReservationRowSkeleton from './components/ReservationRowSkeleton'
import Reservations from '../../Services/Reservations'

function ReservationList({ route, navigation }) {
  const { colors } = useTheme()
  const { title, emptyText, fetchParams } = route.params
  const { isLoading, isError, data, refetch } = useGetReservations(title, {
    ...fetchParams,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  // useRefreshOnFocus(refetch)

  let reservations = isLoading ? [] : data.data

  reservations = Reservations.parseReservations(reservations)

  const handleRefresh = () => {
    refetchByUser()
  }

  const renderListEmpty = () => {
    return <EmptyView text={emptyText} iconColor={colors.success['500']} />
  }

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      data={reservations}
      keyExtractor={item => item.subReservationID}
      onRefresh={() => handleRefresh()}
      refreshing={isRefetchingByUser}
      renderItem={({ item }) => (
        <ReservationRow
          key={item.subReservationID}
          reservation={item}
          onUpdate={() => refetch()}
        />
      )}
      ListEmptyComponent={
        isLoading ? (
          <VStack key={'loading'}>
            <ReservationRowSkeleton key={1} />
            <ReservationRowSkeleton key={2} />
            <ReservationRowSkeleton key={3} />
          </VStack>
        ) : (
          renderListEmpty()
        )
      }
    />
  )
}

export default ReservationList

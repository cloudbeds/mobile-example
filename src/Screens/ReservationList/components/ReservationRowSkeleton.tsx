import React, { memo } from 'react'
import { Box, Skeleton } from 'native-base'

const ReservationRowSkeleton = () => {
  return (
    <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
      <Skeleton.Text />
    </Box>
  )
}

export default memo(ReservationRowSkeleton)

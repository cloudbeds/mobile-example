import React from 'react';
import { Box, HStack, Text, VStack, Button, Skeleton } from 'native-base';

const ReservationRowSkeleton = () => {
 return (
    <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
      <Skeleton.Text />
    </Box>
  );
}

export default ReservationRowSkeleton

import React, { memo } from 'react'
import { Skeleton, VStack } from 'native-base'

interface Props {}

const Indicator: React.FC<Props> = () => {
  return (
    <VStack bg={'primary.100'} flex={1} justifyContent={'center'} p={4}>
      <Skeleton.Text />
      <Skeleton.Text mt={4} />
      <Skeleton rounded={'lg'} mt={8} startColor={'blue.100'} />
    </VStack>
  )
}

export default memo(Indicator)

import React, { memo, useMemo } from 'react'
import { Box, HStack, Text, VStack, useTheme, Pressable } from 'native-base'

import Reservations from '../../../Services/Reservations'
import {
  FrontdeskStatus,
  HousekeepingStatusProps,
  RoomConditions,
  getConditionLabel,
  getFrontdeskLabel,
} from '../../../models/housekeeping'
import { ReservationProps } from '../../../models/reservation'

import BanIcon from '../../../Components/Icons/Ban'
import HousekeepingIcon from '../../../Components/Icons/Housekeeping'

interface Props {
  item: HousekeepingStatusProps
  reservations: ReservationProps[]
  onPress: () => void
}

const HousekeepingItem = ({ item, reservations, onPress }: Props) => {
  const { colors } = useTheme()

  const reservation = useMemo(() => {
    return reservations?.find(r =>
      r?.assigned?.find(
        a => a?.roomID?.toString() === item?.roomID?.toString(),
      ),
    )
  }, [item?.roomID, reservations])

  return (
    <Pressable onPress={onPress}>
      <Box p="4" bg="white" borderBottomWidth="1" borderBottomColor="light.300">
        <HStack justifyContent="space-between" alignItems={'center'}>
          <VStack maxWidth="55%">
            <Text
              size="md"
              fontWeight={'600'}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.roomName}
            </Text>

            <Text fontSize={14} fontWeight={'400'} mt={0.5}>
              {item?.roomTypeName}
            </Text>

            {item?.doNotDisturb ? (
              <HStack
                space={1.5}
                borderRadius={18}
                alignItems={'center'}
                px={2}
                mt={1}
                bg={'primary.200'}>
                <BanIcon />

                <Text fontSize={13} fontWeight={'400'}>
                  Do Not Disturb
                </Text>
              </HStack>
            ) : null}
          </VStack>

          <VStack alignItems="flex-end">
            {item?.frontdeskStatus !== FrontdeskStatus.Unused && reservation ? (
              <Text lineHeight="sm">
                {Reservations.formatDate(reservation?.startDate)}
                &nbsp;-&nbsp;
                {Reservations.formatDate(reservation?.endDate)}
              </Text>
            ) : null}

            <Text size="xs" fontWeight={'500'} mt="1">
              {item?.housekeeper}
            </Text>

            <Text size="xs" fontWeight={'500'} mt="1">
              {getFrontdeskLabel(item?.frontdeskStatus!)}
            </Text>

            {item?.roomCondition ? (
              <HStack
                space={1.5}
                borderRadius={18}
                alignItems={'center'}
                px={2}
                mt={1}
                bg={
                  item?.roomCondition === RoomConditions.clean
                    ? 'primary.200'
                    : 'error.200'
                }>
                <HousekeepingIcon
                  width={14}
                  height={16}
                  color={colors.darkText}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ position: 'relative' }}
                />

                <Text fontSize={13} fontWeight={'400'}>
                  {getConditionLabel(item?.roomCondition!)}
                </Text>
              </HStack>
            ) : null}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  )
}

export default memo(HousekeepingItem)

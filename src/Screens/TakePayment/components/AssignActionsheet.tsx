import React, { memo, useCallback, useMemo } from 'react'
import {
  Actionsheet,
  Box,
  HStack,
  ScrollView,
  Text,
  useTheme,
} from 'native-base'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import { ReservationProps } from '../../../models/reservation'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: ReservationProps) => void
  selectedItem: ReservationProps
  items: ReservationProps[]
}

const AssignActionsheet = ({
  isOpen,
  onClose,
  onSelect,
  selectedItem,
  items,
}: Props) => {
  const { colors } = useTheme()

  const selectedItems = useCallback(
    (item: ReservationProps) => {
      return selectedItem?.reservationID === item?.reservationID
    },
    [selectedItem],
  )

  let rowStyle = useMemo(() => {
    return { paddingLeft: 8, paddingRight: 16 }
  }, [])

  const renderItems = useCallback(
    (item: ReservationProps, index: number) => {
      return (
        <Actionsheet.Item
          key={`${item.reservationID}-${index}`}
          style={rowStyle}
          onPress={() => onSelect(item)}>
          <HStack alignItems="center">
            <Box mr="4" width="6">
              {selectedItems(item) ? (
                <FontAwesomeIcon
                  icon={faCheck as Icon}
                  size={24}
                  color={colors.success['500']}
                />
              ) : null}
            </Box>
            <Text size="lg" fontWeight={selectedItems(item) ? '700' : 'normal'}>
              {`${item?.guestName} - ${item?.reservationID}`}
            </Text>
          </HStack>
        </Actionsheet.Item>
      )
    },
    [rowStyle, selectedItems, colors.success, onSelect],
  )

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box
          w="100%"
          p="4"
          pt={0}
          mx="4"
          borderBottomWidth="1"
          borderBottomColor={colors.muted['300']}>
          <Text size="lg" fontWeight={'600'}>
            {'Assign to'}
          </Text>
        </Box>

        <ScrollView width="100%">{items?.map(renderItems)}</ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default memo(AssignActionsheet)

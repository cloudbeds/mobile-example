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

import { OptionsProps } from '../../../models/housekeeping'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: OptionsProps) => void
  selectedItem: any[]
  title: string
  items: OptionsProps[]
  fromRooms?: boolean
}

const FilterActionsheet = ({
  isOpen,
  onClose,
  onSelect,
  selectedItem,
  title,
  items,
  fromRooms,
}: Props) => {
  const { colors } = useTheme()

  const selectedItems = useCallback(
    (item: OptionsProps) => {
      if (fromRooms) {
        return selectedItem === item.value
      }

      return selectedItem?.includes(item.value)
    },
    [fromRooms, selectedItem],
  )

  let rowStyle = useMemo(() => {
    return { paddingLeft: 8, paddingRight: 16 }
  }, [])

  const disabled = useCallback(
    (item: OptionsProps) => fromRooms && !item?.value,
    [fromRooms],
  )

  const renderItems = useCallback(
    (item: OptionsProps, index: number) => {
      return (
        <Actionsheet.Item
          key={`${item.value}-${index}`}
          style={rowStyle}
          onPress={() => onSelect(item)}>
          <HStack alignItems="center" opacity={disabled(item) ? 0.5 : 1}>
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
              {item.label}
            </Text>
          </HStack>
        </Actionsheet.Item>
      )
    },
    [rowStyle, disabled, selectedItems, colors.success, onSelect],
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
            {title}
          </Text>
        </Box>

        <ScrollView width="100%">{items?.map(renderItems)}</ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default memo(FilterActionsheet)

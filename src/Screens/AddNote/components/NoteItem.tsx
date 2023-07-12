import React, { memo, useCallback } from 'react'
import {
  Box,
  HStack,
  IBoxProps,
  IconButton,
  Text,
  VStack,
  useTheme,
} from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@fortawesome/fontawesome-svg-core'

import { ReservationNotesProps } from '../../../models/reservation'
import Reservations from '../../../Services/Reservations'
import { GuestNotesProps } from '../../../models/guest'

interface Props extends IBoxProps {
  item: ReservationNotesProps & GuestNotesProps
  openDot: (item: any) => void
}

const NoteItem: React.FC<Props> = ({ item, openDot, ...props }) => {
  const { colors } = useTheme()

  const onPressDot = useCallback(() => {
    openDot(item)
  }, [item, openDot])

  return (
    <Box
      borderRadius={'md'}
      borderWidth={0.5}
      borderColor={'info.400'}
      mb={4}
      {...props}>
      <HStack>
        <Box
          width={1}
          bg={'primary.600'}
          borderTopLeftRadius={'md'}
          borderBottomLeftRadius={'md'}
        />

        <VStack py={2} px={3} width={'100%'} space={1}>
          <HStack justifyContent={'space-between'}>
            <Text
              size={'xs'}
              color={'info.700'}
              width={'60%'}
              numberOfLines={2}>
              {item?.userName}
            </Text>
            <Text size={'xs'} color={'info.700'}>
              {Reservations.formatFullDate(item?.dateCreated)}
            </Text>
          </HStack>

          <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
            <Text width={'88%'}>
              {item?.reservationNote || item?.guestNote}
            </Text>

            <IconButton
              p="2"
              icon={
                <FontAwesomeIcon
                  icon={faEllipsisV as Icon}
                  color={colors.darkText}
                />
              }
              onPress={onPressDot}
            />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default memo(NoteItem)

import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclose,
  useTheme,
} from 'native-base'
import { useRoute } from '@react-navigation/native'

import { useToast } from '../../Hooks'
import { goBack } from '../../Navigation/navigationUtils'
import { RouteProps } from '../../Navigation/types'
import { formatUsd } from '../../Services/GlobalService'
import { ToastTypes } from '../../Hooks/useToast'
import { ios } from '../../Theme/devices'
import { ReservationProps } from '../../models/reservation'

import Layout from '../../Components/Layout'
import { useProgress } from '../../Components/ProgressHud/ProgressContext'
import DropDownButton from '../../Components/DropDownButton'
import StyledInput from '../../Components/StyledInput'
import AssignActionsheet from './components/AssignActionsheet'

function TakePayment() {
  const { colors } = useTheme()
  const { isOpen, onOpen, onClose } = useDisclose()
  const { showToast } = useToast()
  const { showProgress, hideProgress } = useProgress()
  const route = useRoute<RouteProps>()

  const reservation = route?.params?.reservation
  const reservations = route?.params?.reservations

  const [selectedRes, setSelectedRes] = useState<ReservationProps>(
    reservation as ReservationProps,
  )

  const showSuccess = useCallback(() => {
    showToast({
      title: 'Payment added.',
      placement: 'top',
    })
  }, [showToast])

  const showError = useCallback(() => {
    showToast({
      title: 'Payment failed.',
      description: 'Please try again.',
      type: ToastTypes.error,
      placement: 'top',
    })
  }, [showToast])

  const onItemSelect = useCallback(
    (item: ReservationProps) => {
      setSelectedRes(item)

      onClose()
    },
    [onClose],
  )

  const renderHeader = useCallback(() => {
    return (
      <VStack space={1}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Box />

          <VStack space={1} ml={2} maxW={'90%'}>
            <Text size={'lg'} fontWeight={'600'}>
              Take a payment
            </Text>
          </VStack>

          <IconButton
            p="2"
            icon={<CloseIcon color={colors.darkText} size="md" />}
            onPress={goBack}
          />
        </HStack>

        <HStack alignItems={'center'} justifyContent={'space-between'} mt={4}>
          <Text fontWeight={'500'}>Balance due</Text>
          <Text size={'md'} fontWeight={'600'}>
            {formatUsd(selectedRes?.balance)}
          </Text>
        </HStack>
      </VStack>
    )
  }, [colors.darkText, selectedRes?.balance])

  return (
    <Layout noScroll noPadding>
      <Box p={4}>{renderHeader()}</Box>

      <Box bg={'white'} flexGrow={1} height={'88%'}>
        <Box flex={1} p={4}>
          <DropDownButton
            label={'Assign to'}
            required
            mt={4}
            value={`${selectedRes?.guestName} - ${selectedRes?.reservationID}`}
            onPress={onOpen}
          />

          <StyledInput
            label="Amount"
            required
            tooltip={
              'Collecting the Balance due is only supported in the mobile app at this time. To collect a different amount, please visit Cloudbeds in your browser.'
            }
            tooltipHeight={98}
            InputLeftElement={
              <Box ml={4}>
                <Text size="md" color={colors.info['600']}>
                  USD
                </Text>
              </Box>
            }
            value={(selectedRes?.balance || 0)?.toString()}
          />

          <StyledInput
            label="Payment type"
            required
            tooltip={
              'For other payment methods, please visit Cloudbeds in your browser.'
            }
            InputLeftElement={
              <Box ml={4}>
                <Text size="md" color={colors.info['600']}>
                  Tap to Pay
                </Text>
              </Box>
            }
            editable={false}
          />
        </Box>

        <Box
          w="100%"
          bgColor="white"
          position={'absolute'}
          bottom={0}
          p={4}
          pb={ios ? 6 : 10}
          safeAreaBottom
          shadow={9}>
          <HStack
            space={2}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Button
              bg={'white'}
              variant={'outline'}
              w={'47%'}
              onPress={showError}>
              {'Cancel'}
            </Button>

            <Button bg={'primary.500'} w={'47%'} onPress={showSuccess}>
              {'Confirm'}
            </Button>
          </HStack>
        </Box>
      </Box>

      <AssignActionsheet
        isOpen={isOpen}
        onClose={onClose}
        items={reservations!}
        onSelect={onItemSelect}
        selectedItem={selectedRes}
      />
    </Layout>
  )
}

export default TakePayment

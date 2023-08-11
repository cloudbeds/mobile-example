import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Checkbox, Image, Text, useDisclose } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import { useDimensions, useToast } from '../../Hooks'
import { ios } from '../../Theme/devices'
import {
  FilterTypes,
  OptionsProps,
  getFrontdeskLabel,
  sheetList,
  sheetTitle,
} from '../../models/housekeeping'
import { RouteProps } from '../../Navigation/types'
import { RootState } from '../../store/store'
import {
  usePostHousekeepingAssignment,
  usePostHousekeepingStatus,
} from '../../Hooks/api'
import { ToastTypes } from '../../Hooks/useToast'
import Reservations from '../../Services/Reservations'

import Layout from '../../Components/Layout'
import DropDownButton from '../../Components/DropDownButton'
import FilterActionsheet from './components/FilterActionsheet'
import { useProgress } from '../../Components/ProgressHud/ProgressContext'

function Rooms() {
  const { roomTypes } = useSelector((state: RootState) => state.reservation)
  const { housekeepers: storedHousekeepers } = useSelector(
    (state: RootState) => state.device,
  )
  const { showProgress, hideProgress } = useProgress()
  const { showToast } = useToast()

  const route = useRoute<RouteProps>()

  const { height, safeArea, headerHeight } = useDimensions()
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclose()

  const housekeepingStatus = route?.params?.housekeepingStatus

  const roomType = useMemo(() => {
    return roomTypes?.find(
      r =>
        r?.roomTypeID?.toString() ===
        housekeepingStatus?.roomTypeID?.toString(),
    )
  }, [housekeepingStatus?.roomTypeID, roomTypes])

  const housekeepers = useMemo(() => {
    const types = storedHousekeepers?.map(h => ({
      label: h?.name! || 'N/A',
      value: h?.housekeeperID! || null,
    }))

    return Reservations.filterRoomTypes(types)
  }, [storedHousekeepers])

  const [doNotDisturb, setDoNotDisturb] = useState(
    housekeepingStatus?.doNotDisturb || false,
  )

  const [housekeepingFilters, setHousekeepingFilters] = useState<
    { [key in FilterTypes]: any } | null
  >({
    [FilterTypes.Type]: housekeepingStatus?.roomTypeID,
    [FilterTypes.Status]: housekeepingStatus?.roomOccupied,
    [FilterTypes.Condition]: housekeepingStatus?.roomCondition,
    [FilterTypes.Assigned]: housekeepingStatus?.housekeeperID,
    [FilterTypes.Frontdesk]: housekeepingStatus?.frontdeskStatus,
  })

  const [sFilters, setSFilters] = useState<FilterTypes | null>(null)

  const { mutate: postHousekeepingStatus } = usePostHousekeepingStatus()
  const { mutate: postHousekeepingAssignment } = usePostHousekeepingAssignment()

  useEffect(() => {
    if (sFilters) {
      onOpenFilter()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sFilters])

  const closeFilter = useCallback(() => {
    onCloseFilter()
    setSFilters(null)
  }, [onCloseFilter])

  const getFilterList = useCallback(
    (type: FilterTypes) => {
      return sheetList(type!, [], housekeepers || [])
    },
    [housekeepers],
  )

  const handleFilters = useCallback(
    (type: FilterTypes) => () => {
      setSFilters(type)
    },
    [],
  )

  const valueLabel = useCallback(
    (type: FilterTypes) => {
      return (
        getFilterList(type)?.find(e => e.value === housekeepingFilters?.[type!])
          ?.label || ''
      )
    },
    [getFilterList, housekeepingFilters],
  )

  const noteSussess = useCallback(
    async (description: string) => {
      if (!description) {
        return
      }

      showToast({
        description,
        placement: 'top',
        showClose: true,
      })
    },
    [showToast],
  )

  const successProcess = useCallback(
    (data: any, type: FilterTypes, housekeeperID = null) => {
      console.log(data)
      hideProgress()

      if (data.message && !data.success) {
        showToast({
          description: data.message,
          title: 'Warning!',
          type: ToastTypes.warning,
          placement: 'top',
          showClose: true,
        })
      } else {
        if (type === FilterTypes.Assigned) {
          const newFilters = {
            ...housekeepingFilters,
            [FilterTypes.Assigned]: housekeeperID,
          }

          console.log('new: ', newFilters)

          setHousekeepingFilters({ ...newFilters } as any)
        } else {
          setDoNotDisturb(!!data?.data?.doNotDisturb)

          const newFilters = {
            ...housekeepingFilters,
            [FilterTypes.Condition]: data?.data?.roomCondition,
          }

          console.log('new: ', newFilters)

          setHousekeepingFilters({ ...newFilters } as any)
        }

        closeFilter()

        noteSussess('')
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeFilter, housekeepingFilters, noteSussess, showToast],
  )

  const errorProcess = useCallback(() => {
    hideProgress()
    showToast({
      description: 'Something went wrong.',
      title: 'Error!',
      type: ToastTypes.error,
      placement: 'top',
      showClose: true,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showToast])

  const setHousekeepingStatus = useCallback(
    (params: any) => {
      showProgress()

      postHousekeepingStatus(params as any, {
        onSuccess: async data => {
          successProcess(data, FilterTypes.Condition)
        },
        onError: () => {
          errorProcess()
        },
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errorProcess, postHousekeepingStatus, successProcess],
  )

  const changeDisturb = useCallback(
    (val: any) => {
      setHousekeepingStatus({
        roomID: housekeepingStatus?.roomID,
        doNotDisturb: val,
      })
    },
    [housekeepingStatus?.roomID, setHousekeepingStatus],
  )

  const onItemSelect = useCallback(
    (item: OptionsProps) => {
      if (sFilters === FilterTypes.Condition) {
        setHousekeepingStatus({
          roomID: housekeepingStatus?.roomID,
          roomCondition: item.value,
        })
      } else {
        if (!item?.value) {
          showToast({
            description: "You can't choose N/A",
            title: 'Warning!',
            type: ToastTypes.warning,
            placement: 'top',
            showClose: true,
          })

          return
        }

        showProgress()

        postHousekeepingAssignment(
          {
            roomIDs: housekeepingStatus?.roomID,
            housekeeperID: item.value,
          } as any,
          {
            onSuccess: async data => {
              successProcess(data, FilterTypes.Assigned, item.value)
            },
            onError: () => {
              errorProcess()
            },
          },
        )
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      errorProcess,
      housekeepingStatus?.roomID,
      postHousekeepingAssignment,
      sFilters,
      setHousekeepingStatus,
      showToast,
      successProcess,
    ],
  )

  const renderHeader = useCallback(
    (img: boolean) => {
      return (
        <>
          <Text
            size={'lg'}
            fontWeight={'600'}
            color={img ? 'white' : 'darkText'}>
            {housekeepingStatus?.roomName} - {housekeepingStatus?.roomTypeName}
          </Text>

          <Text color={img ? 'white' : 'darkText'} mt={1}>
            {getFrontdeskLabel(housekeepingStatus?.frontdeskStatus!)}
          </Text>
        </>
      )
    },
    [
      housekeepingStatus?.frontdeskStatus,
      housekeepingStatus?.roomName,
      housekeepingStatus?.roomTypeName,
    ],
  )

  return (
    <Layout bg={'info.100'}>
      <Box
        height={
          height -
          headerHeight -
          safeArea.bottom -
          safeArea.top -
          (ios ? 0 : 58)
        }>
        {roomType?.roomTypePhotos?.[0] ? (
          <Box borderRadius={'xl'} width={'100%'}>
            <Image
              source={{ uri: roomType?.roomTypePhotos?.[0]! }}
              alt="Alternate Text"
              width="100%"
              height={220}
              borderRadius={'xl'}
            />

            <Box width={'100%'} position={'absolute'} bottom={0}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0)',
                  'rgba(198, 198, 198, 0)',
                  'rgba(98, 98, 98, 0.47)',
                  'rgba(45, 45, 45, 0.82)',
                  '#000',
                ]}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Box
                  width={'100%'}
                  height={'100%'}
                  position={'absolute'}
                  bottom={0}
                  px={4}
                  py={3}
                  opacity={0.5}
                  borderBottomLeftRadius={'xl'}
                  borderBottomRightRadius={'xl'}
                />

                <Box width={'100%'} py={3} px={4}>
                  {renderHeader(true)}
                </Box>
              </LinearGradient>
            </Box>
          </Box>
        ) : (
          renderHeader(false)
        )}

        <Checkbox
          value={String(doNotDisturb)}
          isChecked={doNotDisturb}
          mt={6}
          onChange={changeDisturb}>
          Do Not Disturb
        </Checkbox>

        <DropDownButton
          label={'Condition'}
          mt={6}
          value={valueLabel(FilterTypes.Condition)}
          onPress={handleFilters(FilterTypes.Condition)}
        />

        <DropDownButton
          label={'Room Status'}
          mt={6}
          value={valueLabel(FilterTypes.Status)}
          disabled
        />

        <DropDownButton
          label={'Assigned To'}
          mt={6}
          value={valueLabel(FilterTypes.Assigned)}
          onPress={handleFilters(FilterTypes.Assigned)}
        />

        <Text fontSize={16} fontWeight={'600'} mt={6}>
          Room Comments
        </Text>

        <Box
          px={4}
          py={3}
          borderWidth={1}
          borderColor={'info.500'}
          borderRadius={'md'}
          mt={2}>
          <Text>{housekeepingStatus?.roomComments || 'N/A'}</Text>
        </Box>
      </Box>

      <FilterActionsheet
        isOpen={isOpenFilter}
        onClose={closeFilter}
        items={getFilterList(sFilters!)?.filter(s => s?.value !== 'all')}
        title={sheetTitle(sFilters!)}
        onSelect={onItemSelect}
        selectedItem={housekeepingFilters?.[sFilters!]}
        fromRooms
      />
    </Layout>
  )
}

export default Rooms

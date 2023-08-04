import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  HStack,
  Text,
  useTheme,
  ChevronDownIcon,
  Pressable,
  ChevronUpIcon,
  Input,
  SearchIcon,
  CloseIcon,
  useDisclose,
} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import {
  FilterTypes,
  OptionsProps,
  sheetList,
  sheetTitle,
} from '../../../models/housekeeping'
import { RootState } from '../../../store/store'
import {
  changeHousekeepingFilters,
  changeRoomTypes,
} from '../../../store/slices/deviceSlice'
import Reservations from '../../../Services/Reservations'

// import ExpandableView from '../../../Components/ExpandableView'
import FilterButton from './FilterButton'
import FilterActionsheet from './FilterActionsheet'

interface Props {
  search: string
  setSearch: (val: string) => void
  roomTypes: OptionsProps[]
}

const FilterSection = ({
  search,
  setSearch,
  roomTypes: roomTypesFetch,
}: Props) => {
  const dispatch = useDispatch()
  const {
    housekeepingFilters,
    roomTypes,
    housekeepers: storedHousekeepers,
  } = useSelector((state: RootState) => state.device)
  const { colors } = useTheme()
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclose()

  const [expand, setExpand] = useState(true)
  const [sFilters, setSFilters] = useState<FilterTypes | null>(null)

  const housekeepers = useMemo(() => {
    const types = storedHousekeepers?.map(h => ({
      label: h?.name! || 'N/A',
      value: h?.housekeeperID! || null,
    }))

    return Reservations.filterRoomTypes(types)
  }, [storedHousekeepers])

  useEffect(() => {
    updateInitValues()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypesFetch])

  useEffect(() => {
    checkInitValues()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypes, housekeepers])

  useEffect(() => {
    if (sFilters) {
      onOpenFilter()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sFilters])

  const getFilterList = useCallback(
    (type: FilterTypes) => {
      return sheetList(type!, roomTypes, housekeepers)
    },
    [housekeepers, roomTypes],
  )

  const updateInitValues = useCallback(() => {
    dispatch(changeRoomTypes(roomTypesFetch || []))
  }, [dispatch, roomTypesFetch])

  const checkInitValues = useCallback(() => {
    if (getFilterList(FilterTypes.Type)?.length) {
      const selectedRoomType = getFilterList(FilterTypes.Type)?.find(r =>
        housekeepingFilters?.[FilterTypes.Type]?.includes(r?.value),
      )

      if (!selectedRoomType) {
        dispatch(changeHousekeepingFilters({ [FilterTypes.Type]: ['all'] }))
      }
    }

    if (getFilterList(FilterTypes.Assigned)?.length) {
      const selectedAssigned = getFilterList(FilterTypes.Assigned)?.find(r =>
        housekeepingFilters?.[FilterTypes.Assigned]?.includes(r?.value),
      )

      if (!selectedAssigned) {
        dispatch(changeHousekeepingFilters({ [FilterTypes.Assigned]: ['all'] }))
      }
    }
  }, [dispatch, getFilterList, housekeepingFilters])

  const closeFilter = useCallback(() => {
    onCloseFilter()
    setSFilters(null)
  }, [onCloseFilter])

  const changeExpand = useCallback(() => {
    setExpand(!expand)
  }, [expand])

  const handleFilters = useCallback(
    (type: FilterTypes) => () => {
      setSFilters(type)
    },
    [],
  )

  const resetFilters = useCallback(() => {
    setSearch('')

    dispatch(
      changeHousekeepingFilters({
        [FilterTypes.Type]: ['all'],
        [FilterTypes.Status]: ['all'],
        [FilterTypes.Condition]: ['all'],
        [FilterTypes.Assigned]: ['all'],
        [FilterTypes.Frontdesk]: ['all'],
      }),
    )
  }, [dispatch, setSearch])

  const onItemSelect = useCallback(
    (item: OptionsProps) => {
      let newVal: any = {}
      if (item?.value === 'all') {
        newVal = { [sFilters!]: ['all'] }
      } else {
        let values: any[] =
          housekeepingFilters?.[sFilters!]?.filter(v => v !== 'all') || []
        const findIndex = values.findIndex(v => v === item?.value)
        let newItems = values
        if (findIndex >= 0) {
          newItems?.splice(findIndex, 1)
        } else {
          newItems = [...newItems, item?.value]
        }
        newVal = { [sFilters!]: newItems?.length ? newItems : ['all'] }
      }

      dispatch(changeHousekeepingFilters({ ...newVal }))
      closeFilter()
    },
    [closeFilter, dispatch, housekeepingFilters, sFilters],
  )

  const getSelectedItem = useCallback(
    (type: FilterTypes, val: any) => {
      return getFilterList(type)?.find(e => e.value === val)
    },
    [getFilterList],
  )

  const valueLabel = useCallback(
    (type: FilterTypes) => {
      const details = (housekeepingFilters?.[type!] || [])?.map(
        val => getSelectedItem(type, val)?.label,
      ) || ['All']

      return details?.join(', ')
    },
    [getSelectedItem, housekeepingFilters],
  )

  const filterLength = useMemo(() => {
    let length = 0

    Object.values(housekeepingFilters)?.map(vals => {
      length = length + (vals?.filter(v => v !== 'all')?.length ? 1 : 0)
    })

    return length
  }, [housekeepingFilters])

  // const expandHeight = useMemo(() => {
  //   if (filterLength === 0) {
  //     return 150
  //   } else if (filterLength <= 4) {
  //     return 184
  //   } else {
  //     return 218
  //   }
  // }, [filterLength])

  return (
    <Box
      px="4"
      py="2.5"
      bg="primary.900"
      borderBottomLeftRadius={18}
      borderBottomRightRadius={18}>
      {!expand && (
        <Box>
          <Box mb={4}>
            <Input
              bg={'white'}
              _focus={{ backgroundColor: 'white' }}
              h={46}
              variant={'rounded'}
              InputLeftElement={
                <Box ml={4}>
                  <SearchIcon size={23} color={colors.info['900']} />
                </Box>
              }
              InputRightElement={
                search ? (
                  <Pressable mr={4} onPress={() => setSearch('')}>
                    <CloseIcon size={14} color={colors.info['700']} />
                  </Pressable>
                ) : (
                  <></>
                )
              }
              placeholder="Search rooms"
              fontSize={16}
              returnKeyType="done"
              autoCorrect={false}
              value={search}
              onChangeText={setSearch}
            />
          </Box>

          <HStack space={2} flexWrap={'wrap'} mb={4}>
            <FilterButton
              label="Type"
              value={valueLabel(FilterTypes.Type)}
              onPress={handleFilters(FilterTypes.Type)}
            />
            <FilterButton
              label="Status"
              value={valueLabel(FilterTypes.Status)}
              onPress={handleFilters(FilterTypes.Status)}
            />
            <FilterButton
              label="Condition"
              value={valueLabel(FilterTypes.Condition)}
              onPress={handleFilters(FilterTypes.Condition)}
            />
            <FilterButton
              label="Assigned To"
              value={valueLabel(FilterTypes.Assigned)}
              onPress={handleFilters(FilterTypes.Assigned)}
            />
            <FilterButton
              label="Frontdesk Status"
              value={valueLabel(FilterTypes.Frontdesk)}
              onPress={handleFilters(FilterTypes.Frontdesk)}
            />
            {filterLength ? (
              <Pressable
                py={1.5}
                px={4}
                bg="white"
                borderRadius={18}
                mb={2}
                onPress={resetFilters}>
                <Text fontSize={13} fontWeight={'600'} color="darkText">
                  Reset
                </Text>
              </Pressable>
            ) : null}
          </HStack>
        </Box>
      )}

      <Pressable onPress={changeExpand}>
        <HStack space={2} alignItems={'center'} alignSelf={'center'}>
          <Text color="white" fontWeight={'600'}>
            Search & Filters ({filterLength + (search ? 1 : 0)})
          </Text>

          {!expand ? (
            <ChevronUpIcon size={3.5} color="white" />
          ) : (
            <ChevronDownIcon size={3.5} color="white" />
          )}
        </HStack>
      </Pressable>

      <FilterActionsheet
        isOpen={isOpenFilter}
        onClose={closeFilter}
        items={getFilterList(sFilters!)}
        title={sheetTitle(sFilters!)}
        onSelect={onItemSelect}
        selectedItem={housekeepingFilters?.[sFilters!]}
      />
    </Box>
  )
}

export default FilterSection

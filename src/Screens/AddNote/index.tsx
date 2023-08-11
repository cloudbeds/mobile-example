import React, { memo, useCallback, useMemo, useState } from 'react'
import { Keyboard } from 'react-native'
import {
  Actionsheet,
  Box,
  CloseIcon,
  FlatList,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
  useDisclose,
  useTheme,
} from 'native-base'
import { useRoute } from '@react-navigation/native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Icon } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { useDimensions, useToast } from '../../Hooks'
import { goBack } from '../../Navigation/navigationUtils'
import {
  useDeleteGuestNote,
  useDeleteReservationNote,
  useGetGuestNotes,
  useGetReservationNotes,
  usePostGuestNote,
  usePostReservationNote,
  usePutReservationNote,
  useRefreshByUser,
} from '../../Hooks/api'
import { ReservationNotesProps } from '../../models/reservation'
import { GuestNotesProps } from '../../models/guest'
import { RouteProps } from '../../Navigation/types'
import { delay } from '../../Services/GlobalService'
import { ToastTypes } from '../../Hooks/useToast'
import { ios } from '../../Theme/devices'

import Layout from '../../Components/Layout'
import NoteItem from './components/NoteItem'
import ReservationRowSkeleton from '../ReservationList/components/ReservationRowSkeleton'
import { useProgress } from '../../Components/ProgressHud/ProgressContext'

function AddNote() {
  const { colors } = useTheme()
  const { height, safeArea } = useDimensions()
  const {
    isOpen: isOpenDot,
    onOpen: onOpenDot,
    onClose: onCloseDot,
  } = useDisclose()
  const { showToast } = useToast()
  const { showProgress, hideProgress } = useProgress()
  const route = useRoute<RouteProps>()
  const reservation = route?.params?.reservation
  const isGuest = route?.params?.isGuest

  const [note, setNote] = useState('')
  // eslint-disable-next-line no-spaced-func
  const [selectedNote, setSelectedNote] = useState<
    (ReservationNotesProps & GuestNotesProps) | null
  >(null)

  const { isLoading, data, refetch } = useGetReservationNotes(
    {
      reservationID: reservation?.reservationID,
    },
    { enabled: !isGuest },
  )

  const {
    isLoading: isLoadingGuest,
    data: dataGuest,
    refetch: refetchGuest,
  } = useGetGuestNotes(
    {
      guestID: reservation?.guestID,
    },
    { enabled: isGuest },
  )

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(
    isGuest ? refetchGuest : refetch,
  )

  let reservationNotes: ReservationNotesProps[] = useMemo(
    () =>
      isLoading || isLoadingGuest
        ? []
        : (isGuest ? dataGuest?.data : data?.data) || [],
    [data?.data, dataGuest?.data, isGuest, isLoading, isLoadingGuest],
  )

  const { mutate: postReservationNote } = usePostReservationNote()
  const { mutate: updateReservationNote } = usePutReservationNote()
  const { mutate: deleteReservationNote } = useDeleteReservationNote()
  const { mutate: postGuestNote } = usePostGuestNote()
  const { mutate: deleteGuestNote } = useDeleteGuestNote()

  const noteSussess = useCallback(
    async (description: string) => {
      setNote('')
      setSelectedNote(null)

      await delay(100)

      Keyboard.dismiss()

      await delay(300)

      showToast({
        description,
        placement: 'top',
        showClose: true,
      })

      if (isGuest) {
        refetchGuest()
      } else {
        refetch()
      }
    },
    [isGuest, refetch, refetchGuest, showToast],
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

  const successProcess = useCallback(
    (data: any, message: string) => {
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
        noteSussess(message)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noteSussess, showToast],
  )

  const updateNote = useCallback(() => {
    updateReservationNote(
      {
        reservationID: reservation?.reservationID,
        reservationNoteID: selectedNote?.reservationNoteID,
        reservationNote: note,
      } as any,
      {
        onSuccess: async data => {
          successProcess(data, 'Note updated!')
        },
        onError: () => {
          errorProcess()
        },
      },
    )
  }, [
    errorProcess,
    note,
    reservation?.reservationID,
    selectedNote?.reservationNoteID,
    successProcess,
    updateReservationNote,
  ])

  const sendReservationNote = useCallback(() => {
    postReservationNote(
      {
        reservationID: reservation?.reservationID,
        reservationNote: note,
      } as any,
      {
        onSuccess: async data => {
          successProcess(data, 'Note added!')
        },
        onError: () => {
          errorProcess()
        },
      },
    )
  }, [
    errorProcess,
    note,
    postReservationNote,
    reservation?.reservationID,
    successProcess,
  ])

  const sendGuestNote = useCallback(() => {
    postGuestNote(
      {
        guestID: reservation?.guestID,
        guestNote: note,
      } as any,
      {
        onSuccess: async (data: any) => {
          successProcess(data, 'Note added!')
        },
        onError: () => {
          errorProcess()
        },
      },
    )
  }, [errorProcess, note, postGuestNote, reservation?.guestID, successProcess])

  const sendNote = useCallback(async () => {
    showProgress()

    if (!isGuest && selectedNote) {
      updateNote()
      return
    }

    if (isGuest) {
      sendGuestNote()
    } else {
      sendReservationNote()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, selectedNote, sendGuestNote, sendReservationNote, updateNote])

  const reservationNoteDelete = useCallback(() => {
    deleteReservationNote(
      {
        reservationID: reservation?.reservationID,
        reservationNoteID: selectedNote?.reservationNoteID,
      } as any,
      {
        onSuccess: async data => {
          successProcess(data, 'Note archived!')
        },
        onError: () => {
          errorProcess()
        },
      },
    )
  }, [
    deleteReservationNote,
    errorProcess,
    reservation?.reservationID,
    selectedNote?.reservationNoteID,
    successProcess,
  ])

  const guestNoteDelete = useCallback(() => {
    deleteGuestNote(
      {
        guestID: reservation?.guestID,
        noteID: selectedNote?.guestNoteID,
      } as any,
      {
        onSuccess: async data => {
          successProcess(data, 'Note archived!')
        },
        onError: () => {
          errorProcess()
        },
      },
    )
  }, [
    deleteGuestNote,
    errorProcess,
    reservation?.guestID,
    selectedNote?.guestNoteID,
    successProcess,
  ])

  const archiveReservationNote = useCallback(() => {
    onCloseDot()

    showProgress()
    setSelectedNote(null)

    if (isGuest) {
      guestNoteDelete()
    } else {
      reservationNoteDelete()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestNoteDelete, isGuest, onCloseDot, reservationNoteDelete])

  const openDot = useCallback(
    (item: ReservationNotesProps) => {
      setSelectedNote(item)
      onOpenDot()
    },
    [onOpenDot],
  )

  const onPressEdit = useCallback(() => {
    setNote(selectedNote?.reservationNote || '')
    onCloseDot()
  }, [onCloseDot, selectedNote?.reservationNote])

  const renderHeader = useCallback(() => {
    return (
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <VStack space={1} ml={2} maxW={'90%'}>
          <Text size={'lg'} fontWeight={'600'}>
            {reservation?.guestName}
          </Text>

          {!isGuest ? <Text>{reservation?.reservationID}</Text> : null}
        </VStack>

        <IconButton
          p="2"
          icon={<CloseIcon color={colors.darkText} size="md" />}
          onPress={goBack}
        />
      </HStack>
    )
  }, [
    colors.darkText,
    isGuest,
    reservation?.guestName,
    reservation?.reservationID,
  ])

  const keyExtractor = useCallback(
    (item: ReservationNotesProps, index: number) =>
      `${item.reservationNoteID}-${index}`,
    [],
  )

  const renderItem = useCallback(
    ({ item }: { item: ReservationNotesProps }) => (
      <NoteItem item={item} openDot={openDot} />
    ),
    [openDot],
  )

  const renderListEmptyComponent = useCallback(
    () =>
      isLoading || isLoadingGuest ? (
        <VStack key={'loading'}>
          <ReservationRowSkeleton key={1} />
          <ReservationRowSkeleton key={2} />
          <ReservationRowSkeleton key={3} />
        </VStack>
      ) : (
        <></>
      ),
    [isLoading, isLoadingGuest],
  )

  return (
    <Layout noScroll noPadding>
      <Box p={4} height={20}>
        {renderHeader()}
      </Box>

      <Box
        bg={'white'}
        height={height - safeArea.bottom - safeArea.top - (ios ? 160 : 172)}>
        <FlatList
          p={4}
          showsVerticalScrollIndicator={false}
          data={reservationNotes}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onRefresh={refetchByUser}
          refreshing={isRefetchingByUser}
          ListFooterComponent={<Box h={4} />}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </Box>

      <KeyboardAvoidingView
        behavior={'position'}
        enabled={true}
        keyboardVerticalOffset={-40}>
        <Box
          bg={'white'}
          px={4}
          py={2}
          borderTopWidth={0.2}
          h={40}
          borderColor={'primary.200'}>
          <Input
            bg={'white'}
            _focus={{ backgroundColor: 'white' }}
            minH={46}
            maxH={62}
            borderRadius={24}
            _input={{ paddingTop: 2.5 }}
            InputRightElement={
              note ? (
                <Pressable
                  p={1.5}
                  mx={2}
                  borderRadius={'full'}
                  bg={'success.500'}
                  onPress={sendNote}>
                  <FontAwesomeIcon
                    icon={faPaperPlane as Icon}
                    size={14}
                    color={colors.white}
                  />
                </Pressable>
              ) : (
                <></>
              )
            }
            placeholder="Add note here..."
            fontSize={15}
            multiline
            value={note}
            onChangeText={setNote}
          />
        </Box>
      </KeyboardAvoidingView>

      <Actionsheet isOpen={isOpenDot} onClose={onCloseDot}>
        <Actionsheet.Content>
          {!isGuest ? (
            <Pressable width={'100%'} px={8} py={2} onPress={onPressEdit}>
              <Text size={'lg'}>Edit</Text>
            </Pressable>
          ) : null}

          <Pressable
            width={'100%'}
            px={8}
            py={2}
            mt={2}
            onPress={archiveReservationNote}>
            <Text size={'lg'} color={'error.500'}>
              Archive
            </Text>
          </Pressable>
        </Actionsheet.Content>
      </Actionsheet>
    </Layout>
  )
}

export default memo(AddNote)

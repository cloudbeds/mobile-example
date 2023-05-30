import { MFD_API_HOST } from '@env'
import { useMutation, useQuery } from 'react-query'
import { useAPIQueryClient } from '../APIQueryClient'

export const useGetReservations = (key, params) => {
  const { get } = useAPIQueryClient()
  return useQuery(['getReservations', key], () =>
    get(`${MFD_API_HOST}/getReservations`, { params }),
  )
}

export const useGetReservationNotes = params => {
  const { get } = useAPIQueryClient()
  return useQuery('getReservationNotes', () =>
    get(`${MFD_API_HOST}/getReservationNotes`, { params }),
  )
}

export const usePutReservation = () => {
  const { put } = useAPIQueryClient()
  return useMutation('putReservation', body =>
    put(`${MFD_API_HOST}/putReservation`, body),
  )
}

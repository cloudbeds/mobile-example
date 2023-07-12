import { MFD_API_HOST } from '@env'
import { useMutation, useQuery } from 'react-query'

import { apiQueryContext } from '../../Services/AxiosService'

export const getReservation = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/getReservation`, { params })
      resolve(result?.data || {})
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export const getReservationNotes = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/getReservationNotes`, {
        params,
      })
      resolve(result?.data || [])
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export const useGetReservation = params => {
  const { get } = apiQueryContext
  return useQuery('getReservation', () =>
    get(`${MFD_API_HOST}/getReservation`, { params }),
  )
}

export const useGetReservations = (key, params) => {
  const { get } = apiQueryContext
  return useQuery(['getReservations', key], () =>
    get(`${MFD_API_HOST}/getReservations`, { params }),
  )
}

export const useGetReservationNotes = (params, options) => {
  const { get } = apiQueryContext
  return useQuery(
    'getReservationNotes',
    () => get(`${MFD_API_HOST}/getReservationNotes`, { params }),
    options,
  )
}

export const usePutReservation = () => {
  const { put } = apiQueryContext
  return useMutation('putReservation', body =>
    put(`${MFD_API_HOST}/putReservation`, body),
  )
}

export const usePostReservationNote = () => {
  const { post } = apiQueryContext
  return useMutation('postReservationNote', body =>
    post(`${MFD_API_HOST}/postReservationNote`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

export const usePutReservationNote = () => {
  const { put } = apiQueryContext
  return useMutation('putReservationNote', body =>
    put(`${MFD_API_HOST}/putReservationNote`, body),
  )
}

export const useDeleteReservationNote = () => {
  const { delete: deleteAxios } = apiQueryContext
  return useMutation('deleteReservationNote', body =>
    deleteAxios(
      `${MFD_API_HOST}/deleteReservationNote?reservationID=${body?.reservationID}&reservationNoteID=${body?.reservationNoteID}`,
    ),
  )
}

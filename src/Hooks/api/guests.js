import { MFD_API_HOST } from '@env'
import { useQuery, useMutation } from 'react-query'

import { apiQueryContext } from '../../Services/AxiosService'

export const useGetGuestsByStatus = (key, params) => {
  const { get } = apiQueryContext
  return useQuery(['getGuestsByStatus', key], () =>
    get(`${MFD_API_HOST}/getGuestsByStatus`, { params }),
  )
}

export const useGetGuestList = (key, params) => {
  const { get } = apiQueryContext
  return useQuery(['getGuestList', key], () =>
    get(`${MFD_API_HOST}/getGuestList`, { params }),
  )
}

export const useGetGuestsByFilter = (key, params) => {
  const { get } = apiQueryContext
  return useQuery(['getGuestsByFilter', key], () =>
    get(`${MFD_API_HOST}/getGuestsByFilter`, { params }),
  )
}

export const useGetGuestNotes = (params, options) => {
  const { get } = apiQueryContext
  return useQuery(
    'getGuestNotes',
    () => get(`${MFD_API_HOST}/getGuestNotes`, { params }),
    options,
  )
}

export const getGuestNotes = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/getGuestNotes`, {
        params,
      })
      resolve(result?.data || [])
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export const usePostGuestNote = () => {
  const { post } = apiQueryContext
  return useMutation('postGuestNote', body =>
    post(`${MFD_API_HOST}/postGuestNote`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

export const useDeleteGuestNote = () => {
  const { delete: deleteAxios } = apiQueryContext
  return useMutation('deleteGuestNote', body =>
    deleteAxios(
      `${MFD_API_HOST}/deleteGuestNote?guestID=${body?.guestID}&noteID=${body?.noteID}`,
    ),
  )
}

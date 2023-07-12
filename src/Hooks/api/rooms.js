import { MFD_API_HOST } from '@env'
import { useMutation, useQuery } from 'react-query'

import { apiQueryContext } from '../../Services/AxiosService'

export const useGetRooms = (key, params, options) => {
  const { get } = apiQueryContext
  return useQuery(
    ['getRooms', key],
    () => get(`${MFD_API_HOST}/getRooms`, { params }),
    options,
  )
}

export const useGetRoomsUnassigned = (key, params, options) => {
  const { get } = apiQueryContext
  return useQuery(
    ['getRoomsUnassigned', key],
    () => get(`${MFD_API_HOST}/getRoomsUnassigned`, { params }),
    options,
  )
}

export const usePostRoomAssign = () => {
  const { post } = apiQueryContext
  return useMutation('postRoomAssign', body =>
    post(`${MFD_API_HOST}/postRoomAssign`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

import { MFD_API_HOST } from '@env'
import { useMutation, useQuery } from 'react-query'
import { useAPIQueryClient } from '../APIQueryClient'

export const useGetRooms = (key, params, options) => {
  const { get } = useAPIQueryClient()
  return useQuery(
    ['getRooms', key],
    () => get(`${MFD_API_HOST}/getRooms`, { params }),
    options,
  )
}

export const usePostRoomAssign = () => {
  const { post } = useAPIQueryClient()
  return useMutation('postRoomAssign', body =>
    post(`${MFD_API_HOST}/postRoomAssign`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

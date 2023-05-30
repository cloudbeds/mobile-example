import { MFD_API_HOST } from '@env'
import { useQuery } from 'react-query'
import { useAPIQueryClient } from '../APIQueryClient'

export const useGetGuestsByStatus = (key, params) => {
  const { get } = useAPIQueryClient()
  return useQuery(['getGuestsByStatus', key], () =>
    get(`${MFD_API_HOST}/getGuestsByStatus`, { params }),
  )
}

export const useGetGuestList = (key, params) => {
  const { get } = useAPIQueryClient()
  return useQuery(['getGuestList', key], () =>
    get(`${MFD_API_HOST}/getGuestList`, { params }),
  )
}

export const useGetGuestsByFilter = (key, params) => {
  const { get } = useAPIQueryClient()
  return useQuery(['getGuestsByFilter', key], () =>
    get(`${MFD_API_HOST}/getGuestsByFilter`, { params }),
  )
}

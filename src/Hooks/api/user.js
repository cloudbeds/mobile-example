import { MFD_API_HOST } from '@env'
import { useQuery } from 'react-query'
import { useAPIQueryClient } from '../APIQueryClient'

export const useGetUserInfo = params => {
  const { get } = useAPIQueryClient()
  return useQuery('userinfo', () => get(`${MFD_API_HOST}/userinfo`, { params }))
}

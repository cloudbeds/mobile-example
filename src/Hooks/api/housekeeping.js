import { MFD_API_HOST } from '@env'
import { useQuery, useMutation } from 'react-query'

import { apiQueryContext } from '../../Services/AxiosService'

export const useGetHousekeepingStatus = (key, params, options = {}) => {
  const { get } = apiQueryContext
  return useQuery(
    ['getHousekeepingStatus', key],
    () => get(`${MFD_API_HOST}/getHousekeepingStatus`, { params }),
    options,
  )
}

export const useGetHousekeepers = (key, params, options = {}) => {
  const { get } = apiQueryContext
  return useQuery(
    ['getHousekeepers', key],
    () => get(`${MFD_API_HOST}/getHousekeepers`, { params }),
    options,
  )
}

export const usePostHousekeepingStatus = () => {
  const { post } = apiQueryContext
  return useMutation('postHousekeepingStatus', body =>
    post(`${MFD_API_HOST}/postHousekeepingStatus`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

export const usePostHousekeepingAssignment = () => {
  const { post } = apiQueryContext
  return useMutation('postHousekeepingAssignment', body =>
    post(`${MFD_API_HOST}/postHousekeepingAssignment`, body, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  )
}

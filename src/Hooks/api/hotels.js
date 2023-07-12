import { MFD_API_HOST } from '@env'
import { useQuery } from 'react-query'

import { apiQueryContext } from '../../Services/AxiosService'

export const getHotels = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/getHotels`, { params })
      resolve(result?.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export const useGetHotels = params => {
  const { get } = apiQueryContext
  return useQuery('getHotels', () =>
    get(`${MFD_API_HOST}/getHotels`, { params }),
  )
}

export const useGetDashboard = date => {
  const { get } = apiQueryContext
  return useQuery(
    ['getDashboard', date],
    () => get(`${MFD_API_HOST}/getDashboard`, { params: { date } }),
    {
      initialData: {
        data: {
          arrivals: 0,
          departures: 0,
          inHouse: 0,
          percentageOccupied: 0,
        },
      },
    },
  )
}

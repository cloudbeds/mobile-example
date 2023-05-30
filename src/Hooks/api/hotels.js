import { MFD_API_HOST } from '@env'
import { useQuery } from 'react-query'
import { useAPIQueryClient } from '../APIQueryClient'

export const useGetHotels = params => {
  const { get } = useAPIQueryClient()
  return useQuery('getHotels', () =>
    get(`${MFD_API_HOST}/getHotels`, { params }),
  )
}

export const useGetDashboard = date => {
  const { get } = useAPIQueryClient()
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
        }
      }
    }
  )
}
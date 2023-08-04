import { MFD_API_HOST } from '@env'

import { apiQueryContext } from '../../Services/AxiosService'

export const getUserInfo = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/userinfo`, { params })
      resolve(result)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export const getUsers = params => {
  const { get } = apiQueryContext

  return new Promise(async (resolve, reject) => {
    try {
      const result = await get(`${MFD_API_HOST}/getUsers`, { params })
      resolve(result?.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

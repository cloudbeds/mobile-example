import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TokenDataProps } from '../models/user'
import { RootState } from '../store/store'
import { clearUser, changeTokenData } from '../store/slices/userSlice'
import Authentication from '../Services/Authentication'
import { clearDevice } from '../store/slices/deviceSlice'
import { clearReservation } from '../store/slices/reservationSlice'

const AuthService = new Authentication()

export default function useAuth() {
  const dispatch = useDispatch()
  const { tokenData } = useSelector((state: RootState) => state.user)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {}, [])

  let isValid = AuthService.isTokenValid(tokenData!)

  const getAuthSession = useCallback(async () => {
    let tokens: TokenDataProps | null = tokenData

    setLoading(true)

    try {
      if (!tokens) {
        throw new Error()
      }

      // check token is valid
      let isValid = AuthService.isTokenValid(tokens!)

      if (!isValid) {
        tokens = (await AuthService.refreshToken(tokens!)) as TokenDataProps
      }

      setLoading(false)
      dispatch(changeTokenData(tokens))
    } catch (err) {
      setLoading(false)
      dispatch(clearUser())
    }
  }, [dispatch, tokenData])

  const login = useCallback(async () => {
    setLoading(true)
    try {
      let tokens = await AuthService.login()
      setLoading(false)
      dispatch(changeTokenData(tokens))
    } catch (error) {
      setLoading(false)
    }
  }, [dispatch])

  const logout = useCallback(async () => {
    try {
      await AuthService.logout()
      dispatch(clearUser())
      dispatch(clearDevice())
      dispatch(clearReservation())
    } catch (error) {}
  }, [dispatch])

  return { getAuthSession, login, logout, loading, tokenData, isValid }
}

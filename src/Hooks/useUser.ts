import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import {
  PropertyProps,
  UserInfoProps,
  UsersItemProps,
  UsersProps,
} from '../models/user'
import { RootState } from '../store/store'
import {
  changeUserInfo as storeUserInfo,
  changeProperties as storeProperties,
  changeCurrentProperty as storeCurrentProperty,
  changeAllowed,
} from '../store/slices/userSlice'
import { getHotels, getUserInfo, getUsers } from './api'
import { useProgress } from '../Components/ProgressHud/ProgressContext'

export default function useUser() {
  const dispatch = useDispatch()
  const { user, properties, currentProperty, isAllowed } = useSelector(
    (state: RootState) => state.user,
  )
  const { showProgress, hideProgress } = useProgress()

  const [loading, setLoading] = useState<boolean>(false)

  const changeUserInfo = useCallback(
    (userInfo: UserInfoProps) => {
      dispatch(storeUserInfo(userInfo))
    },
    [dispatch],
  )

  const changeCurrentProperty = useCallback(
    (property: PropertyProps) => {
      dispatch(storeCurrentProperty(property))
    },
    [dispatch],
  )

  const changeAllowPermission = useCallback(
    (allow: boolean) => {
      dispatch(changeAllowed(allow))
    },
    [dispatch],
  )

  const changeProperties = useCallback(
    (pros: PropertyProps[]) => {
      dispatch(storeProperties(pros))
    },
    [dispatch],
  )

  const fetchUsers = useCallback(
    async (showLoader = false) => {
      setLoading(true)

      if (showLoader) {
        showProgress('Loading...')
      }

      try {
        let userInfo: UserInfoProps = await getUserInfo()
        let users: UsersProps = await getUsers()

        const fn = _.spread(_.union)
        const mergedUsers = (fn(Object.values(users)) || []) as UsersItemProps[]
        const filteredUser = mergedUsers.find(
          item => item?.userID === userInfo?.user_id,
        )

        if (filteredUser?.propertyId) {
          userInfo = await getUserInfo({
            property_id: filteredUser?.propertyId,
            role_details: true,
          })
          userInfo = { ...userInfo, ...filteredUser }
        }

        const hotels: PropertyProps[] = (await getHotels()) || []
        changeProperties(hotels || [])

        const cProperty = hotels.find(
          h =>
            h?.propertyID?.toString() === filteredUser?.propertyId?.toString(),
        )
        changeCurrentProperty(cProperty!)

        changeUserInfo(userInfo)

        setLoading(false)
        hideProgress()
      } catch (error) {
        setLoading(false)
        hideProgress()
      }
    },
    [
      changeCurrentProperty,
      changeProperties,
      changeUserInfo,
      hideProgress,
      showProgress,
    ],
  )

  return {
    loading,
    user,
    properties,
    currentProperty,
    isAllowed,
    fetchUsers,
    changeCurrentProperty,
    changeAllowPermission,
    changeProperties,
  }
}

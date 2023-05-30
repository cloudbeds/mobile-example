import React, { createContext, useContext, useEffect, useState } from 'react'
import { useGetHotels, useGetUserInfo } from './api'

export const UserContext = createContext(null)

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const {
    isLoading: isLoadingHotelData,
    data: hotelData,
    refetchHotels,
    error
  } = useGetHotels()
  const {
    isLoading: isLoadingUserData,
    data: userInfoData,
    refetchUser,
  } = useGetUserInfo()
  const [user, setUser] = useState({})
  const [properties, setProperties] = useState([])
  const [currentProperty, setCurrentProperty] = useState({})

  useEffect(() => {
    if (hotelData) {
      setProperties(hotelData.data)
      setCurrentProperty(hotelData.data[0])
    }

    if (userInfoData) {
      setUser(userInfoData)
    }
  }, [isLoadingHotelData, isLoadingUserData, hotelData, userInfoData])

  const userContext = {
    user,
    properties,
    currentProperty,
  }

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  )
}

export default UserProvider

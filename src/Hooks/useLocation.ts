import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/store'
import { changeCurrentLocation } from '../store/slices/userSlice'
import { locationService } from '../Services/LocationService'

export default function useLocation() {
  const dispatch = useDispatch()
  const { currentLocation } = useSelector((state: RootState) => state.user)

  const getCurrentLocation = async () => {
    try {
      const pos = await locationService.getCurrentPosition()
      dispatch(changeCurrentLocation(pos))

      return true
    } catch (error) {
      return false
    }
  }

  return { currentLocation, getCurrentLocation }
}

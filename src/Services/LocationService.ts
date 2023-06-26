import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation'

export class LocationService {
  constructor() {}

  getCurrentPosition(): Promise<GeolocationResponse> {
    return new Promise(async (resolve, reject) => {
      Geolocation.getCurrentPosition(
        pos => {
          resolve(pos)
        },
        error => {
          console.error(error)
          reject(error)
        },
        { enableHighAccuracy: true },
      )
    })
  }
}

export const locationService = new LocationService()

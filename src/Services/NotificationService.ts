import notifee, { AuthorizationStatus } from '@notifee/react-native'

export default class NotificationService {
  constructor() {}

  requestNotificationPermission() {
    return new Promise(async (resolve, reject) => {
      try {
        let settings = await notifee.requestPermission()

        const enabled =
          settings?.authorizationStatus === AuthorizationStatus.AUTHORIZED

        console.log('Authorization settings:', settings)

        resolve(enabled)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }
}

export const notificationService = new NotificationService()

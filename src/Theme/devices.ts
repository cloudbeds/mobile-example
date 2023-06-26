import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const { height, width } = Dimensions.get('window')

export const ios = Platform.OS === 'ios'
export const android = Platform.OS === 'android'

export const appBuildNumber = DeviceInfo.getBuildNumber()
export const appVersion = DeviceInfo.getVersion()
export const deviceId = async () => await DeviceInfo.getUniqueId()

const devices = (function () {
  const iPhone6Height = 667,
    iphoneSEHeight = 568,
    iPhoneXHeight = 812,
    iPhoneXWidth = 375,
    veryNarrowPhoneThreshold = 340

  return {
    dimensions: {
      height,
      width,
    },
    iPhone6Height,
    iphoneSEHeight,
    iPhoneXHeight,
    iPhoneXWidth,
    isIOS14: ios && parseFloat(Platform.Version as string) >= 14,
    isLargePhone: width >= iPhoneXWidth,
    isNarrowPhone: width < iPhoneXWidth,
    isSmallPhone: height <= iPhone6Height,
    isTallPhone: height >= iPhoneXHeight,
    isTinyPhone: height <= iphoneSEHeight,
    isVeryNarrowPhone: width < veryNarrowPhoneThreshold,
    scaleHeight: ios ? height : height * 0.934,
  }
})()

export default devices

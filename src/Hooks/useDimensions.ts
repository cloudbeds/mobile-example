import { ScaledSize, useWindowDimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

import { ios } from '../Theme/devices'

const deviceDimensions = {
  iphone6: {
    height: 667,
    width: 375,
  },
  iphoneSE: {
    height: 568,
    width: 320,
  },
  iphoneX: {
    height: 812,
    width: 375,
  },
  samsung9: {
    height: 725,
    width: 360,
  },
  iPadPro12: {
    height: 1366,
    width: 1024,
  },
  iPadPro11: {
    height: 1194,
    width: 834,
  },
}

export interface DeviceDimensions extends ScaledSize {
  isPad: boolean
  isLargePhone: boolean
  isNarrowPhone: boolean
  isSmallPhone: boolean
  isTallPhone: boolean
  isTinyPhone: boolean
  isSmallAndroidPhone: boolean
  scaleHeight?: any
  headerHeight?: any
  safeArea: EdgeInsets
}

export default function useDimensions(): DeviceDimensions {
  const { height, width, ...restOfDimensions } = useWindowDimensions()
  const headerHeight = useHeaderHeight()
  const safeArea = useSafeAreaInsets()

  return {
    height,
    isPad: width >= deviceDimensions.iPadPro11.width,
    isLargePhone: width >= deviceDimensions.iphoneX.width,
    isNarrowPhone: width < deviceDimensions.iphoneX.width,
    isSmallAndroidPhone: height <= deviceDimensions.samsung9.height,
    isSmallPhone: height <= deviceDimensions.iphone6.height,
    isTallPhone: height >= deviceDimensions.iphoneX.height,
    isTinyPhone: height <= deviceDimensions.iphoneSE.height,
    width,
    scaleHeight: ios ? height : height * 0.968,
    headerHeight,
    safeArea,
    ...restOfDimensions,
  }
}

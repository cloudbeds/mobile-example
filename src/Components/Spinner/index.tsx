import React, { memo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Image, useTheme } from 'native-base'

import images from '../../Theme/images'
import { SpinAnimation } from '../Animations/SpinAnimation'

type SpinnerProps = {
  color?: string
  duration?: number
  size?: 'small' | 'large' | number
  style?: StyleProp<ViewStyle>
}

const Spinner = ({
  color = '',
  duration = 1500,
  size = 20,
  style: contentStyle,
  ...props
}: SpinnerProps) => {
  const { colors } = useTheme()

  let style
  switch (size) {
    case 'large':
      style = { width: 36, height: 36 }
      break
    case 'small':
      style = { width: 20, height: 20 }
      break
    default:
      style = { width: size, height: size }
  }

  return (
    <View
      {...props}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        { alignItems: 'center', justifyContent: 'center' },
        contentStyle,
      ]}>
      <SpinAnimation duration={duration}>
        <Image
          source={images.Spinner}
          style={style}
          tintColor={color || colors.white}
          size={30}
          alt="spinner"
        />
      </SpinAnimation>
    </View>
  )
}

export default memo(Spinner)

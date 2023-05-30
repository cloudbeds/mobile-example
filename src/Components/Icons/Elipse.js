import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

const ElipseIcon = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Circle
        cx={8}
        cy={8}
        r={6.5}
        fill={props.color}
        stroke="#fff"
        strokeWidth={3}
      />
    </Svg>
  </View>
)

export default ElipseIcon

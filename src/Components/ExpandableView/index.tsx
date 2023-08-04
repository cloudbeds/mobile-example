import React, { ReactNode, useEffect, useState } from 'react'
import { Animated, ViewProps } from 'react-native'

interface Props extends ViewProps {
  children: ReactNode
  expanded?: boolean
  expandHeight: number
}

const ExpandableView = ({
  expanded = false,
  expandHeight,
  children,
}: Props) => {
  const [height] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? expandHeight : 0,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }, [expanded, expandHeight, height])

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Animated.View style={{ height, overflow: 'hidden' }}>
      {children}
    </Animated.View>
  )
}

export default ExpandableView

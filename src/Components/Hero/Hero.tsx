import React, { ReactNode } from 'react'
import { StatusBar, StyleSheet, useColorScheme } from 'react-native'
import { Box, Image } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ios } from '../../Theme/devices'

export interface Props {
  children: ReactNode
  image?: boolean
}

const Hero = ({ children, image }: Props) => {
  const insets = useSafeAreaInsets()
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <Box bg={'white'} position={'relative'} pt={insets.top}>
      <StatusBar
        barStyle={ios || isDarkMode ? 'light-content' : 'dark-content'}
      />

      {image ? (
        <Box style={{ ...StyleSheet.absoluteFillObject }}>
          <Image
            source={require('../../Assets/hero-background.png')}
            alt="Alternate Text"
            width="100%"
            height={320}
          />
        </Box>
      ) : null}

      {children}
    </Box>
  )
}

export default Hero

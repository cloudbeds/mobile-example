import React, { ReactNode } from 'react'
import { StatusBar, StyleSheet, useColorScheme } from 'react-native'
import { Box, Image } from 'native-base'

import { ios } from '../../Theme/devices'
import images from '../../Theme/images'

export interface Props {
  children: ReactNode
  image?: boolean
  source?: any
  height?: number
  mask?: boolean
}

const Hero = ({ children, image, source, height, mask }: Props) => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <Box bg={'white'} position={'relative'} safeAreaTop>
      <StatusBar
        barStyle={ios || isDarkMode ? 'light-content' : 'dark-content'}
      />

      {image ? (
        <Box style={{ ...StyleSheet.absoluteFillObject }}>
          <Image
            source={source || images.Hero}
            alt="Alternate Text"
            width="100%"
            height={height || 320}
          />

          {mask && (
            <Box
              style={{ ...StyleSheet.absoluteFillObject }}
              bg="black"
              opacity={0.6}
            />
          )}
        </Box>
      ) : null}

      {children}
    </Box>
  )
}

export default Hero

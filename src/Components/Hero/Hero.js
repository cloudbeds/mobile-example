import React from 'react'
import { Box, Image } from 'native-base'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Hero = ({ children, image }) => {
  const insets = useSafeAreaInsets()
  return (
    <Box p="4" style={{ position: 'relative', paddingTop: (insets.top + 16) }}>
      {image ? (
        <Box style={{ ...StyleSheet.absoluteFillObject }}>
          <Image
            source={require('../../Assets/hero-background.png')}
            alt="Alternate Text"
            width="100%"
            height="100%"
          />
        </Box>
      ) : null}
      {children}
    </Box>
  )
}

export default Hero

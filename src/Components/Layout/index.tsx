import React, { ReactNode } from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Box, ScrollView, useTheme } from 'native-base'

export interface LayoutProps {
  children: ReactNode
  noScroll?: boolean
  noPadding?: boolean
}

const Layout = ({
  children,
  noScroll = false,
  noPadding = false,
}: LayoutProps) => {
  const { colors } = useTheme()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: colors.primary['100'],
  }

  return (
    <Box bg="primary.100" flex="1">
      <SafeAreaView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <ScrollView
          scrollEnabled={!noScroll}
          showsVerticalScrollIndicator={false}>
          <Box p={noPadding ? 0 : '4'}>{children}</Box>
        </ScrollView>
      </SafeAreaView>
    </Box>
  )
}

export default Layout

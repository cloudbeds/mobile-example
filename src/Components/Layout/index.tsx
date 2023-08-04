import React, { ReactNode, useCallback } from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Box, ScrollView, useTheme } from 'native-base'

export interface LayoutProps {
  children: ReactNode
  noScroll?: boolean
  noPadding?: boolean
  bg?: any
}

const Layout = ({
  children,
  noScroll = false,
  noPadding = false,
  bg,
}: LayoutProps) => {
  const { colors } = useTheme()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: bg || colors.primary['100'],
  }

  bg = bg || colors.primary['100']

  const renderContent = useCallback(() => {
    return <Box p={noPadding ? 0 : '4'}>{children}</Box>
  }, [children, noPadding])

  return (
    <Box flex="1" bg={bg}>
      <SafeAreaView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        {noScroll ? (
          renderContent()
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderContent()}
          </ScrollView>
        )}
      </SafeAreaView>
    </Box>
  )
}

export default Layout

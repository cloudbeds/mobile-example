import React from 'react'
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { Box, Text, Pressable } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Icon } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { GenericNavigationProps } from './types'

export const headerLeft = (
  navigation: GenericNavigationProps & (() => void),
) => {
  const backPress = () => {
    if (navigation.goBack) {
      navigation.goBack()
    } else {
      navigation()
    }
  }

  return (
    <Pressable
      width={8}
      height={10}
      alignItems={'flex-end'}
      justifyContent={'center'}
      onPress={backPress}>
      <FontAwesomeIcon icon={faChevronLeft as Icon} size={16} />
    </Pressable>
  )
}

export const headerTitle = (title?: any) => {
  if (!title) {
    return null
  }

  return (
    <Box px={2}>
      <Text size={'lg'} textAlign={'center'} fontWeight={'600'}>
        {title}
      </Text>
    </Box>
  )
}

export const renderHeader = ({
  navigation,
  colors,
}: any): StackNavigationOptions => ({
  animationTypeForReplace: 'pop',
  gestureEnabled: false,
  animationEnabled: true,
  headerShown: false,
  headerStyle: {
    backgroundColor: colors.primary['100'],
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerLeft: () => headerLeft(navigation),
  headerTitle: ({ children }: any) => headerTitle(children),
  ...TransitionPresets.SlideFromRightIOS,
})

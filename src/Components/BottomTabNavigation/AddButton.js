import React from 'react'
import { Box, Square, useTheme } from 'native-base'
import { View, TouchableOpacity } from 'react-native'

import AddIcon from './AddIcon'

const AddButton = ({ state, descriptors, navigation, route, index }) => {
  const { colors } = useTheme()
  const { options } = descriptors[route.key]
  const isFocused = state.index === index

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true })
    }
  }

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  return (
    <Box style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: -28}}>
        <Box
          style={{ width: 68, height: 66, position: 'relative' }}
          bg="white"
          borderRadius={'66'}
          shadow="6">
          <Box
            style={{
              position: 'absolute',
              top: 20,
              bottom: -12,
              left: -8,
              right: -8
            }}
            bg="white">
            <Box style={{ flex: 1, alignItems: 'center',  }}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                <Square size="8">
                  <AddIcon color={colors.primary['500']}/>
                </Square>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </View>
    </Box>
  )
}

export default AddButton

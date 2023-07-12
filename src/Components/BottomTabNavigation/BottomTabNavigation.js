import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Square, useTheme } from 'native-base'

const getPaddingBottom = insets => Math.max(insets.bottom + 2, 0)

const BottomTabNavigation = ({ state, descriptors, navigation, insets }) => {
  const paddingBottom = getPaddingBottom(insets)
  const { colors } = useTheme()

  return (
    <Box
      bg="white"
      pt="2"
      shadow="6"
      flexDirection={'row'}
      pb={paddingBottom}
      py={16}>
      {state.routes.map((route, index) => {
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

        const icon = options.tabBarIcon({
          color: colors.darkText,
        })

        return (
          <Box key={route.key} flex={1} alignItems={'center'}>
            <Box
              p="2"
              rounded="lg"
              borderColor={isFocused ? 'primary.500' : 'white'}
              bg={isFocused ? 'primary.50' : null}
              borderWidth="1">
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                <Square size="8">{icon}</Square>
              </TouchableOpacity>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default BottomTabNavigation

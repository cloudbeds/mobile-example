import { Box, Square, useTheme } from 'native-base';
import React from 'react'
import { TouchableOpacity } from 'react-native'

import AddButton from './AddButton'

const getPaddingBottom = insets => Math.max(insets.bottom + 4, 0)


const BottomTabNavigation = ({ state, descriptors, navigation, insets }) => {
  const paddingBottom = getPaddingBottom(insets)
  const { colors } = useTheme()
  return (
    <Box
      bg="white"
      pt="2"
      shadow="6"
      style={{ flexDirection: 'row', paddingBottom, paddingHorizontal: 16 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        if (options.addButton) {
          return (
            <AddButton
              key={route.key}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
              route={route}
              index={index}
            />
          )
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
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
          <Box key={route.key} style={{ flex: 1, alignItems: 'center' }}>
            <Box
              p="2"
              rounded="lg"
              borderColor={isFocused ? 'primary.500' : 'white'}
              bg={isFocused ? 'primary.50' : null}
              borderWidth="1" >
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
        );
      })}
    </Box>
  );
}

export default BottomTabNavigation

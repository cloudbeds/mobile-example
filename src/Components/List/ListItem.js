import React from 'react'
import { Box, HStack, Spacer, useTheme } from 'native-base'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { TouchableOpacity } from 'react-native'

const ListItem = ({
  leftContent,
  bodyContent,
  rightContent,
  route,
  onPress,
  ...rest
}) => {
  const { colors } = useTheme()

  const handlePress = () => {
    if (onPress) {
      return onPress()
    }
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={handlePress}
      activeOpacity={onPress ? 0.5 : 1}>
      <HStack
        py="5"
        px="4"
        bg="white"
        borderBottomColor="light.300"
        borderBottomWidth="1"
        {...rest}>
        {leftContent ? <Box justifyContent="center">{leftContent}</Box> : null}
        <Box px="4" justifyContent="center">
          {bodyContent}
        </Box>
        <Spacer />
        {rightContent ? (
          <Box justifyContent="center" maxWidth="70%">
            {rightContent}
          </Box>
        ) : null}
        {onPress ? (
          <Box justifyContent="center" ml="2">
            <FontAwesomeIcon
              icon={faChevronRight}
              color={colors.primary['500']}
            />
          </Box>
        ) : null}
      </HStack>
    </TouchableOpacity>
  )
}

export default ListItem
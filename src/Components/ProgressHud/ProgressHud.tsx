import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Box, Spinner, Text } from 'native-base'

interface Props {
  message?: any
  showLoader?: boolean
}

const ProgressHud: React.FC<Props> = ({ message = '', showLoader = true }) => {
  return (
    <Box p={4} style={styles.container}>
      <BlurView blurType="light" blurAmount={10} style={styles.container} />

      {showLoader && (
        <View>
          {message !== '' && (
            <Text size={'lg'} mb={4}>
              {message}
            </Text>
          )}

          <Spinner size={'lg'} />
        </View>
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
})

export default memo(ProgressHud)

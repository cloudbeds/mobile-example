import React from 'react'
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg'

const AddIcon = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
    <Svg width={58} height={58} viewBox="0 0 14 16" fill="none" {...props}>
      <Path
        d="M2.188 2.965C3.518 1.635 5.122.969 7 .969c1.878 0 3.473.665 4.785 1.996 1.33 1.312 1.996 2.907 1.996 4.785 0 1.878-.665 3.482-1.996 4.813C10.473 13.874 8.878 14.53 7 14.53c-1.878 0-3.482-.656-4.813-1.969C.875 11.232.22 9.628.22 7.75c0-1.878.656-3.473 1.968-4.785Zm8.75 5.55v-1.53c0-.22-.11-.329-.329-.329H8.094V4.141c0-.22-.11-.329-.328-.329H6.234c-.218 0-.328.11-.328.329v2.515H3.391c-.22 0-.329.11-.329.328v1.532c0 .218.11.328.329.328h2.515v2.515c0 .22.11.329.328.329h1.532c.218 0 .328-.11.328-.329V8.844h2.515c.22 0 .329-.11.329-.328Z"
        fill={props.color}
      />
    </Svg>
  </View>
)

export default AddIcon

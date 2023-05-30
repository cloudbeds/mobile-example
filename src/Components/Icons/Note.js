import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const NoteIcon = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
    <Svg width={24} height={24} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M21.5 15.313a2.17 2.17 0 0 1-.656 1.593l-3.938 3.938a2.17 2.17 0 0 1-1.593.656H2.75a2.17 2.17 0 0 1-1.594-.656A2.17 2.17 0 0 1 .5 19.25V2.75c0-.625.219-1.156.656-1.594A2.17 2.17 0 0 1 2.75.5h16.5a2.17 2.17 0 0 1 1.594.656c.437.438.656.969.656 1.594v12.563Zm-6 3.75 3.563-3.563H15.5v3.563ZM19.25 2.75H2.75v16.5h10.5v-4.875c0-.313.11-.578.328-.797.219-.219.485-.328.797-.328h4.875V2.75Z"
        fill={props.color}
      />
    </Svg>
  </View>
)

export default NoteIcon

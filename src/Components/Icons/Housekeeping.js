import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const HousekeepingIcon = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      // eslint-disable-next-line react-native/no-inline-styles
      { alignItems: 'center', justifyContent: 'center' },
      props.style,
    ]}>
    <Svg width={30} height={30} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.092 12.892c.446.605 1.338 1.816 1.873 4.495 0 0 .178.692-.268.605h-7.224c-.624 0-.446-.691-.446-.691l.09-.519c.624-2.247 1.337-3.285 1.694-3.803l-.624-2.42c-.09-.26.089-.433.267-.433h1.516V2.432c0-.26.179-.432.446-.432h.892c.268 0 .446.173.446.432v7.694h1.516c.268 0 .446.173.357.346l-.535 2.42Zm-1.249-1.383H12.97c-.089 0-.178.086-.178.173l.268 1.037h1.694l.268-1.037c0-.087-.09-.173-.179-.173Zm0 4.236.981 1.037h.714c-.446-1.556-.892-2.247-1.249-2.766h-2.586c-.357.519-.714 1.21-1.16 2.766h3.3v-1.037ZM3.605 8.483h1.606l1.605 2.075c.09.173.357.173.535 0l.535-.346c.179-.086.179-.345.09-.605L4.408 5.112c-.09-.173-.357-.173-.624-.086l-.446.432c-.179.086-.268.346-.09.519l.803.95H3.16c-.356 0-.624.173-.891.346C2 7.62 2 7.965 2 8.311l1.516 7.953c.09.605.625 1.037 1.249 1.037h4.37l.268-1.47h-4.46L3.605 8.483Zm6.868 1.21.248-1.123H8.065L6.905 7.1h4.281c.357 0 .714.087.892.346.179.26.268.519.179.865l-.268 1.383h-1.516Z"
        fill={props.color}
      />
    </Svg>
  </View>
)

export default HousekeepingIcon

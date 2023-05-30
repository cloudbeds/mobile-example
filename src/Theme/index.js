import { extendTheme } from 'native-base'
import colors from './colors'
import typography from './typography'
import shadows from './shadows'
import Button from './components/Button'
import Text from './components/Text'

const theme = {
  colors,
  shadows,
  ...typography,
}

export default extendTheme({
  ...theme,
  components: {
    Button: {
      ...Button(theme),
    },
    Text: {
      ...Text,
    },
  },
})

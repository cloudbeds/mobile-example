import { ITheme } from 'native-base'

const colors = {
  contrastThreshold: 7,
  // Singleton colors
  white: '#FFFFFF',
  black: '#000000',
  lightText: '#778295',
  darkText: '#001238',
  // Primary colors
  lightning: {
    50: '#F5F7FF',
    100: '#EBF0FF',
    200: '#CCD9FF',
    300: '#99B3FF',
    400: '#668CFF',
    500: '#3366ff',
    600: '#264DC3',
    700: '#193586',
    800: '#0D1C4A',
    900: '#001238',
  },
  solar: {
    50: '#FFFCF4',
    100: '#FFF9EA',
    200: '#FEEFCB',
    300: '#FDDF96',
    400: '#FCD062',
    500: '#FBC02D',
    600: '#BC9125',
    700: '#7D621D',
    800: '#3F3316',
    900: '#191711',
  },
  mint: {
    50: '#F5FCFA',
    100: '#EBF9F6',
    200: '#CCEFE7',
    300: '#99E0D0',
    400: '#65D0B8',
    500: '#32C0A0',
    600: '#25917B',
    700: '#196257',
    800: '#0C3332',
    900: '#05171D',
  },
  fog: {
    50: '#F8F9FA',
    100: '#F1F3F4',
    200: '#E4E6EA',
    300: '#DDE0E4',
    400: '#BBC0CA',
    500: '#99A1AF',
    600: '#778295',
    700: '#596273',
    800: '#3B4351',
    900: '#1E2330',
  },
  dusk: {
    50: '#FEF7F7',
    100: '#FEEEEF',
    200: '#FCD5D7',
    300: '#F9ABAE',
    400: '#F68086',
    500: '#F3565D',
    600: '#B64149',
    700: '#792D35',
    800: '#3D1822',
    900: '#180C16',
  },
  // Derived colors
  danger: {},
  error: {},
  success: {},
  warning: {},
  muted: {},
  primary: {},
  info: {},
  secondary: {},
  light: {},
  tertiary: {},
}

colors.danger = colors.dusk
colors.error = colors.dusk
colors.success = colors.mint
colors.warning = colors.solar
colors.muted = colors.fog
colors.primary = colors.lightning
colors.secondary = colors.white
colors.tertiary = colors.mint
colors.info = colors.fog
colors.light = colors.fog

export default colors as unknown as ITheme['colors']

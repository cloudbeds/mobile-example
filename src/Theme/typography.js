const typography = {
  letterSpacings: {
    xs: '-0.05em',
    sm: '-0.025em',
    md: 0,
    lg: '0.025em',
    xl: '0.05em',
    '2xl': '0.1em',
  },
  lineHeights: {
    '2xs': '1em',
    xs: '1.25em',
    sm: '1.4em',
    md: '1.35em',
    lg: '1.3em',
    xl: '1.75em',
    '2xl': '2em',
    '3xl': '2.5em',
    '4xl': '3em',
    '5xl': '4em',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
  fonts: {
    heading: undefined,
    body: undefined,
    mono: undefined,
  },
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 36,
    '5xl': 48,
    '6xl': 64,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
}

const fonts = {
  ...typography,
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      200: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
}

export default fonts

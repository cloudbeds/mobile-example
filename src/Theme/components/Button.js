export default (theme) => ({
  baseStyle: {
    rounded: '3xl',
  },
  sizes: {
    md: {
      px: '6',
      py: '3',
      _text: {
        fontSize: 'md',
        fontWeight: 500,
        fontFamily: 'Poppins',
      },
    },
  },
  variants: {
    outline: ({ colorScheme }) => {
      return {
        border: '1px solid',
        borderColor: `${colorScheme}.500`,
        _text: {
          color: 'darkText',
          fontWeight: 500,
          fontFamily: 'Poppins',
        },
      }
    },
  },
})

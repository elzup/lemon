import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Hiragino Maru Gothic Pro"',
      '"Roboto"',
      '"Helvetica"',
      'Arial',
      'sans-serif',
    ].join(','),
  },

  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
  },
})

export default theme

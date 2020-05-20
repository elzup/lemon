import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import theme from '../theme'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Component {...pageProps} />
    </MuiThemeProvider>
  </>
)

export default App

import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import theme from '../theme'
import { GlobalCSS } from '../style/global'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCSS />

      <Component {...pageProps} />
    </MuiThemeProvider>
  </>
)

export default App

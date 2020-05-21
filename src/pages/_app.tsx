import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import { GlobalCSS } from '../style/global'
import theme from '../theme'

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalCSS />

        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
          <Component {...pageProps} />
        </AnimatePresence>
      </MuiThemeProvider>
    </>
  )
}

export default App

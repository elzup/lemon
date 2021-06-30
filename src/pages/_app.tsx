import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import Head from 'next/head'
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
      <Head>
        <link rel="icon" type="image/png" href="/icon-4x.png" sizes="192x192" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icon-1x.png" />
        <link rel="apple-touch-icon" href="/icon-2x.png" />

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffdd" />
        <meta name="robots" content="noindex,nofollow,noarchive" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
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

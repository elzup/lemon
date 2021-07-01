import { motion } from 'framer-motion'
import React from 'react'
import App from './App'
import AuthContainer from './AuthContainer'

const pageVariants = {
  initial: { scale: 0.6, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  exit: { scale: 0.6, opacity: 0 },
}

export function withAppli<OProps extends {}>(Component: React.ElementType) {
  const WithApp = (props: OProps) => (
    <App>
      <AuthContainer />
      <motion.div initial="initial" animate="in" variants={pageVariants}>
        <Component {...props} />
      </motion.div>
    </App>
  )
  return WithApp
}

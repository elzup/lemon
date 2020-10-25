const config = {
  env: process.env.NODE_ENV,
  whitelist: (process.env.WHITE_USERS || '').split(','),
} as const

export default config

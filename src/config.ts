const config = {
  env: process.env.NODE_ENV,
  whitelist: [process.env.WHITE_USER1 || '', process.env.WHITE_USER2 || ''],
} as const

export default config

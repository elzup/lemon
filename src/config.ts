const config = {
  env: process.env.NODE_ENV,
  whitelist: (process.env.WHITE_USERS || '').split(','),
  gamesListApi: process.env.GAMES_LIST_API || '',
} as const

export default config

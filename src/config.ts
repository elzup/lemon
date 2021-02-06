import { PersonRaw, Person } from './types'

const isPersonRaw = (p: Object): p is PersonRaw =>
  'name' in p &&
  'birthday' in p &&
  typeof p['name'] === 'string' &&
  typeof p['birthday'] === 'string'

const isPersonRawArray = (p: unknown): p is PersonRaw[] => {
  if (!Array.isArray(p)) return false
  return p.every(isPersonRaw)
}

const loadPieple = (s: string): Person[] => {
  const o = JSON.parse(s)

  if (!isPersonRawArray(o)) {
    console.error('parse error. invalid PEOPLE config')
    return []
  }
  return o.map((p) => ({
    ...p,
    birthday: +new Date(p.birthday),
    birthdayStr: p.birthday,
  }))
}

const config = {
  env: process.env.NODE_ENV,
  storageHost: process.env.FIREBASE_STORAGE_BUCKET || '',
  whitelist: (process.env.WHITE_USERS || '').split(','),
  gamesListApi: process.env.GAMES_LIST_API || '',
  persons: loadPieple(process.env.PEOPLE || '{}'),
} as const

export default config

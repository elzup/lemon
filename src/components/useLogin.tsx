import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import config from '../config'
import { getAuth } from '../service/firebase'
import { LoginInfo } from '../types'
import { lemonHash } from '../utils'

const { auth } = getAuth()
function useLogin() {
  const [login, setLogin] = useState<LoginInfo>({ status: 'loading' })
  const [fuser, loading] = useAuthState(auth)

  const email = fuser?.email
  const uid = fuser?.uid
  useEffect(() => {
    if (loading) return setLogin({ status: 'loading' })
    if (!uid) return setLogin({ status: 'none' })

    if (config.whitelist.includes(lemonHash(email || ''))) {
      setLogin({ status: 'auth', uid })
    } else {
      setLogin({
        status: 'invalid',
        message: '登録されていないユーザです。',
      })
    }
  }, [loading, email, uid])

  return [login, setLogin] as const
}
export default useLogin

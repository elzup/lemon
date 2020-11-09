import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import config from '../config'
import { getAuth } from '../service/firebase'
import { LoginInfo } from '../types'
import Header from './Header'

const { auth } = getAuth()

export const LoginContext = createContext<
  [LoginInfo, Dispatch<SetStateAction<LoginInfo>>]
>([
  { status: 'loading' },
  () => {
    //
  },
])

const App: React.FC<{ noHeader?: boolean }> = ({
  noHeader = false,
  children,
}) => {
  const [login, setLogin] = useState<LoginInfo>({ status: 'loading' })
  const [fuser, loading] = useAuthState(auth)

  useEffect(() => {
    if (loading) return setLogin({ status: 'loading' })
    if (!fuser) return setLogin({ status: 'none' })

    if (config.whitelist.includes(fuser.email || '')) {
      setLogin({ status: 'auth', uid: fuser.uid })
    } else {
      setLogin({
        status: 'invalid',
        message: '登録されていないユーザです。',
      })
    }
  }, [loading, !fuser, fuser?.email])

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <main>
        {!noHeader && <Header />}
        {children}
      </main>
    </LoginContext.Provider>
  )
}

export default App

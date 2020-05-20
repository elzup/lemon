import {
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
  { status: 'none' },
  () => {
    //
  },
])

const App: React.FC<{ noHeader?: boolean }> = ({
  noHeader = false,
  children,
}) => {
  const [login, setLogin] = useState<LoginInfo>({ status: 'none' })
  const [fuser, loading] = useAuthState(auth)

  useEffect(() => {
    setLogin({ status: 'none' })
    if (loading || !fuser) return
    if (fuser.email || '' in config.whitelist) {
      setLogin({
        status: 'invalid',
        message: '登録されていないユーザです。',
      })
      return
    }

    setLogin({ status: 'auth', uid: fuser.uid })
  }, [loading, fuser && fuser.email])

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

import React, {
  createContext,
  Dispatch,
  SetStateAction
} from 'react'
import { LoginInfo } from '../types'
import Header from './Header'
import useLogin from './useLogin'

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
  const [login, setLogin] = useLogin()

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

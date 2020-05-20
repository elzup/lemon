import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LoginContext } from './App'

function AuthContainer() {
  console.log('top render')
  const [login] = useContext(LoginContext)
  const router = useRouter()

  if (login.status !== 'auth' && login.status !== 'loading') {
    router.push('/login')
  }
  return <div />
}

export default AuthContainer

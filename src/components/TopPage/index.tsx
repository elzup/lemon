import { useRouter } from 'next/router'
import { useContext } from 'react'
import App, { LoginContext } from '../App'

function TopPage() {
  console.log('top render')
  const [login] = useContext(LoginContext)
  const router = useRouter()

  if (login.status !== 'auth' && login.status !== 'loading') {
    router.push('/login')
    return <div />
  }
  return <div>home</div>
}

function TopPageContainer() {
  return (
    <App>
      <TopPage />
    </App>
  )
}

export default TopPageContainer

import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from '../../service/firebase'
import App from '../App'
import LoginButton from './LoginButton'

const { auth } = getAuth()

function LoginPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (loading) return <Typography>loading</Typography>

  if (!!user) {
    router.push('/')
    return null
  }

  return (
    <App>
      <Typography variant="h3">lemona</Typography>
      <LoginButton />
    </App>
  )
}

export default LoginPage

import { useAuthState } from 'react-firebase-hooks/auth'
import Router, { useRouter } from 'next/router'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { Typography, Container } from '@material-ui/core'
import { useContext } from 'react'
import { getAuth, getFirestore, usableUserId } from '../../service/firebase'
import App, { LoginContext } from '../App'
import { User } from '../../types'
import LoginButton from '../LoginButton'

const { auth } = getAuth()
const fdb = getFirestore()

function LoginMain({ uid }: { uid: string }) {
  const router = useRouter()
  const [logins] = useContext(LoginContext)

  if (logins.status === 'auth') {
    router.push('/') // NOTE: alraedy registered
    return null
  }
  return (
    <div>
      <Container>
        <LoginButton />
      </Container>
    </div>
  )
}

function LoginPage() {
  const [user, loading] = useAuthState(auth)

  if (loading) return <Typography>loading</Typography>
  if (!user) {
    Router.push('/') // NOTE: not login
    return null
  }

  return (
    <App>
      <Typography variant="h3">lemona</Typography>
    </App>
  )
}

export default LoginPage

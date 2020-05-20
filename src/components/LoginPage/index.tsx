import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { getAuth } from '../../service/firebase'
import App from '../App'
import LoginButton from './LoginButton'

const { auth } = getAuth()
const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  button {
    margin-top: 20px;
  }
`

function LoginPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (loading) return <Typography>loading</Typography>

  if (!!user) {
    router.push('/')
    return null
  }

  return (
    <App noHeader>
      <Style>
        <div>
          <Typography variant="h3">レモポータル</Typography>
          <LoginButton />
        </div>
      </Style>
    </App>
  )
}

export default LoginPage

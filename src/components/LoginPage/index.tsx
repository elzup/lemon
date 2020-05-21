import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styled from 'styled-components'
import { getAuth } from '../../service/firebase'
import App, { LoginContext } from '../App'
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

  div {
  }

  .title {
    display: flex;
    h3 {
      font-size: 2rem;
      padding: 0.5rem;
    }
    img {
      height: calc(3rem * 1.167);
      border-radius: 30%;
    }
  }
`

function LoginPageMain() {
  const [login] = useContext(LoginContext)
  const router = useRouter()

  if (login.status === 'auth') {
    router.push('/')
    return null
  }

  return (
    <Style>
      <div>
        <div className="title">
          <img src="/icon-4x.png" />
          <Typography variant="h3">レモポータル</Typography>
        </div>
        <LoginButton />
        <div>
          {login.status === 'invalid' && (
            <Typography variant="caption" color="error">
              {login.message}
            </Typography>
          )}
        </div>
      </div>
    </Style>
  )
}

function LoginPage() {
  return (
    <App noHeader>
      <LoginPageMain />
    </App>
  )
}

export default LoginPage

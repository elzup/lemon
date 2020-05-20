import { Button } from '@material-ui/core'
import { getAuth } from '../service/firebase'

const { login } = getAuth()

function LoginButton() {
  return <Button onClick={() => login()}>ログイン</Button>
}

export default LoginButton

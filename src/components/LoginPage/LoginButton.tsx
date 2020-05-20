import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { getAuth } from '../../service/firebase'

const { login } = getAuth()

const StyledButton = styled(Button)`
  background: #ff8e53;
  border: 0;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  font-size: 1.2rem;
`

function LoginButton() {
  return (
    <StyledButton
      onClick={() => {
        login()
      }}
      fullWidth
      size="large"
    >
      ログイン
    </StyledButton>
  )
}

export default LoginButton

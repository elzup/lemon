import { Typography, Container } from '@material-ui/core'
import styled from 'styled-components'
import App from '../App'
import AuthContainer from '../AuthContainer'

const Style = styled.div``

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">アイコンメイク</Typography>
      </Container>
    </Style>
  )
}

function AppIconPageContainer() {
  return (
    <App>
      <AuthContainer />
      <Main />
    </App>
  )
}

export default AppIconPageContainer

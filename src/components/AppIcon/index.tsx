import { Typography } from '@material-ui/core'
import App from '../App'
import AuthContainer from '../AuthContainer'

function Main() {
  return (
    <div>
      <Typography>アイコン作成</Typography>
    </div>
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

import App from '../App'
import AuthContainer from '../AuthContainer'
import Screen from './Screen'

function TopPageContainer() {
  return (
    <App>
      <AuthContainer />
      <Screen />
    </App>
  )
}

export default TopPageContainer

import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const MainStyle = styled.div`
  background: white;
  border-radius: 20%;
  width: 100%;
  height: 100%;
  padding: 8%;
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5%;
    > div {
      text-align: center;

      img {
        width: 100%;
        border-radius: 20%;
      }
      p {
        font-weight: bold;
      }
    }
  }
`

type Appli = {
  name: string
  icon: string
  path: string
}
const apps: Appli[] = [
  { icon: '/appicon/face.svg', name: 'アイコン', path: 'app-icon' },
]

function Main() {
  return (
    <MainStyle>
      <div className="grid">
        {apps.map((app) => (
          <div key={app.name}>
            <img src={app.icon} />
            <Typography>{app.name}</Typography>
          </div>
        ))}
      </div>
    </MainStyle>
  )
}

const ScreenStyle = styled.section`
  padding: 8%;
`

function Screen() {
  return (
    <ScreenStyle>
      <Main />
    </ScreenStyle>
  )
}
export default Screen

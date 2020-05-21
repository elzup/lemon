import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'

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
  { icon: '/appicon/face.svg', name: 'アイコンメイク', path: '/app/icon' },
]

function Main() {
  const router = useRouter()

  return (
    <MainStyle>
      <div className="grid">
        {apps.map((app) => (
          <div key={app.name} onClick={() => router.push(app.path)}>
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

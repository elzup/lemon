import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const MainStyle = styled.div`
  background: white;
  border-radius: 20%;
  width: 100%;
  height: 100%;
  padding: 8%;
  .container {
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

const containerAnim = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

type Appli = {
  name: string
  icon: string
  path: string
}
const apps: Appli[] = [
  { icon: '/appicon/face.svg', name: 'アイコン', path: '/app/icon' },
  { icon: '/appicon/clock.svg', name: 'クロック', path: '/app/clock' },
  { icon: '/appicon/games.svg', name: 'げーむす', path: '/app/games' },
  { icon: '/appicon/tree.svg', name: 'ガーデン', path: '/app/garden' },
]

function Main() {
  const router = useRouter()

  return (
    <MainStyle>
      <motion.div
        className="container"
        variants={containerAnim}
        initial="hidden"
        animate="visible"
      >
        {apps.map((app) => (
          <motion.div
            key={app.name}
            className="item"
            variants={itemAnim}
            onClick={() => router.push(app.path)}
          >
            <img src={app.icon} />
            <Typography>{app.name}</Typography>
          </motion.div>
        ))}
      </motion.div>
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

import { Container, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import App from '../App'
import AuthContainer from '../AuthContainer'

const Style = styled.div``

type Game = {
  title: string
  link: string
}
const games: Game[] = [{ title: 'hoge', link: 'https://' }]

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">げーむす</Typography>
        <Typography variant="caption">一緒にやったゲームリスト</Typography>
        {games.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </Container>
    </Style>
  )
}

function GameCard({ game }: { game: Game }) {
  return (
    <div>
      <Typography variant="h6">{game.title}</Typography>
    </div>
  )
}

const pageVariants = {
  initial: { scale: 0.6, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  exit: { scale: 0.6, opacity: 0 },
}

function AppGamesPageContainer() {
  return (
    <App>
      <AuthContainer />

      <motion.div initial="initial" animate="in" variants={pageVariants}>
        <Main />
      </motion.div>
    </App>
  )
}

export default AppGamesPageContainer

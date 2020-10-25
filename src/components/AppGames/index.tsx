import { Container, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import App from '../App'
import AuthContainer from '../AuthContainer'
import { loadGames } from '../../service/gas'
import { Game } from '../../types'

const Style = styled.div``

function Main() {
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    loadGames().then((games) => {
      console.log(games)

      setGames(games)
    })
  }, [])

  return (
    <Style>
      <Container>
        <Typography variant="h5">げーむす</Typography>
        <Typography variant="caption">一緒にやったゲームリスト</Typography>
        {!games && <Typography>laoding...</Typography>}
        {games &&
          games.map((game) => <GameCard key={game.title} game={game} />)}
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

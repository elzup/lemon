import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { loadGames } from '../../service/gas'
import { Game } from '../../types'
import { withAppli } from '../withAppli'

const Style = styled.div``

function Main() {
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    loadGames().then(setGames)
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

const AppGamesPage = withAppli(Main)

export default AppGamesPage

import { Container, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import config from '../../config'

import { loadGames } from '../../service/gas'
import { Game } from '../../types'
import { withAppli } from '../withAppli'

const Style = styled.div`
  .games-box {
    column-count: 2;
    column-gap: 4px;
    column-fill: auto;
  }
`

function Main() {
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    loadGames().then(setGames)
  }, [])

  return (
    <Style>
      <Container>
        <Typography variant="h5">ゲーム</Typography>
        <Typography variant="caption">一緒にやったゲームリスト</Typography>
        {!games && <Typography>laoding...</Typography>}
        <div className="games-box">
          {games &&
            games.map((game) => <GameCard key={game.title} game={game} />)}
        </div>
      </Container>
    </Style>
  )
}

function GameCard({ game }: { game: Game }) {
  const [show, setShow] = useState<boolean>(false)

  return (
    <GameWrap>
      <div className="head">
        <Typography variant="h6">
          {game.title}
          {game.optional && (
            <Typography variant="caption">{game.optional}</Typography>
          )}
        </Typography>
      </div>

      <div className="tags">
        {game.pattern.split('、').map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <img
        style={{ display: show ? 'block' : 'none' }}
        src={`//${config.storageHost}/images/${game.title}`}
        onLoad={() => setShow(true)}
      />
    </GameWrap>
  )
}
const GameWrap = styled.div`
  background: white;
  border-radius: 4%;
  margin-top: 12px;
  padding: 12px;
  img {
    width: 100%;
  }
  .head {
    display: flex;
    justify-content: space-between;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    span {
      background: #eee;
      padding: 0 4px;
      border-radius: 3px;
    }
  }
`

const AppGamesPage = withAppli(Main)

export default AppGamesPage

import { Container, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { uploadGameImage } from '../../service/firebase'
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
  const [imgUrl, setImgUrl] = useState<string>(config.storageImg(game.title))

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
        {game.pattern
          .split('、')
          .filter(Boolean)
          .map((name) => (
            <span key={name}>{name}</span>
          ))}
        {game.model && <span data-model={game.model}>{game.model}</span>}
      </div>
      <img
        style={{ display: show ? 'block' : 'none' }}
        src={imgUrl}
        onLoad={() => setShow(true)}
      />
      <div className="footer">
        <label>
          <CloudUploadIcon fontSize="small" />
          <input
            type="file"
            onChange={(e) => {
              if (!e || !e.target.files) return
              const file = e.target.files[0]

              if (!file) return
              uploadGameImage(game.title, file).then(() => {
                setImgUrl((v) => `${v}&t=${Date.now()}`)
              })
            }}
          />
        </label>
      </div>
    </GameWrap>
  )
}
const GameWrap = styled.div`
  background: white;
  border-radius: 4%;
  margin-top: 12px;
  img {
    width: 100%;
  }
  .head {
    display: flex;
    justify-content: space-between;
    padding: 12px 12px 0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    span {
      background: #eee;
      padding: 0 4px;
      border-radius: 3px;
      &[data-model='Switch'] {
        border-left: solid red;
      }
      &[data-model='Card'] {
        border-left: solid green;
      }
      &[data-model='Web'] {
        border-left: solid blue;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
    color: #b3b3b3;
    input {
      display: none;
    }
  }
`

const AppGamesPage = withAppli(Main)

export default AppGamesPage

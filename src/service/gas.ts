import config from '../config'
import { Game } from '../types'

const { gamesListApi } = config

export async function loadGames() {
  if (!gamesListApi) {
    console.error('GAMES_LIST_API not loaded')
    return null
  }

  const res = await fetch(config.gamesListApi)
  const games = await res.json()

  console.log(games)
  if (!isGames(games)) return null

  return games.filter((game) => game.title !== '')
}

function isGames(data: unknown): data is Game[] {
  if (!Array.isArray(data)) return false
  return data.every(isGame)
}
function isGame(data: unknown): data is Game {
  if (!data || typeof data !== 'object' || data === null) return false

  return 'id' in data && 'title' in data && 'model' in data && 'pattern' in data
}

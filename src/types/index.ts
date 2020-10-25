export type Action = {
  name: string
}

export type LoginInfo =
  | {
      status: 'loading'
    }
  | {
      status: 'none'
    }
  | {
      status: 'invalid'
      message: string
    }
  | {
      status: 'auth'
      uid: string
    }

export type Game = {
  id: string
  title: string
  model: string
  pattern: string
  // link: string
}

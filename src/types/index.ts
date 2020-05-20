export type Action = {
  name: string
}

export type LoginInfo =
  | {
      status: 'none'
    }
  | {
      status: 'auth'
      uid: string
    }

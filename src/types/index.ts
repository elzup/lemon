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

export type PersonRaw = {
  name: string
  birthday: string
}

export type Person = {
  name: string
  birthday: number
  birthdayStr: string
}

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
  optional: string
  model: string
  pattern: string
  // link: string
}

export type Tree = {
  gen: number
  seed: number
  wat: number
  lastWat: number
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

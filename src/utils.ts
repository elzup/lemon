import crypto from 'crypto'

export function range(start: number, end: number, step: number) {
  const arr: number[] = []

  for (let i = start; i < end; i += step) {
    arr.push(i)
  }
  return arr
}
export function lemonHash(str: string) {
  return crypto.createHash('md5').update(`ANOLEMOON_${str}`).digest('hex')
}
export class Random {
  x: number
  y: number
  z: number
  w: number
  constructor(seed = 88675123) {
    this.x = 123456789
    this.y = 362436069
    this.z = 521288629
    this.w = seed
  }

  // XorShift
  next() {
    let t

    t = this.x ^ (this.x << 11)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)))
  }

  // min以上max以下の乱数を生成する
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next())

    return min + (r % (max + 1 - min))
  }
}

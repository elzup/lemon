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

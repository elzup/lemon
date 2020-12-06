/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: remove

import { Container, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { withAppli } from '../withAppli'

const Style = styled.div``

type People = {
  name: string
  birthday: number
}
const peoples: People[] = [{ name: 'hiro', birthday: +new Date('1994-01-05') }]
const today = Date.now()

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">ライフクロック</Typography>
        {peoples.map((people) => (
          <ClockCard key={people.name} people={people} time={today} />
        ))}
      </Container>
    </Style>
  )
}

const YEAR1990 = +new Date('1990-01-01')
const YEAR2100 = +new Date('2100-01-01')
const YEAR = 60 * 60 * 24 * 100 * 1000
const YEAR_100 = 60 * 60 * 24 * 100
const currentAge = (birth: number, current: number) => current - birth
/*

- current age

- 縦線
  - 西暦 2010, 2020, 2030
  - birthday
  - age / 10 year

*/

function ClockCard({ people, time }: { people: People; time: number }) {
  return (
    <div>
      <Typography variant="h6">{people.name}</Typography>

      {people.birthday}
    </div>
  )
}

const AppClockPage = withAppli(Main)

export default AppClockPage

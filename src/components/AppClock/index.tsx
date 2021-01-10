/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: remove

import { Container, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Person } from '../../types'
import config from '../../config'
import { withAppli } from '../withAppli'

const { persons } = config
const Style = styled.div``

const today = Date.now()

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">ライフクロック</Typography>
        {persons.map((person) => (
          <ClockCard key={person.name} person={person} time={today} />
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

function ClockCard({ person, time }: { person: Person; time: number }) {
  return (
    <div>
      <Typography variant="h6">{person.name}</Typography>

      {person.birthday}
    </div>
  )
}

const AppClockPage = withAppli(Main)

export default AppClockPage

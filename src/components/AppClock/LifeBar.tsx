import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Person } from '../../types'

type Props = {
  bgnTime: number
  endTime: number
  persons: Person[]
}
type Age = {
  valid: boolean
  num: number
  full: boolean
}
const yearDay = (y: number, date: Date) => {
  const d = new Date(date.getTime())

  d.setFullYear(y)
  return d
}

const calcGrid = (bgn: number, end: number, persons: Person[]) => {
  const by = new Date(bgn).getFullYear()
  const ey = new Date(end).getFullYear()
  const now = new Date()

  const days: Record<number, Age>[] = persons.map(() => ({}))

  const years = []

  for (let y = by; y <= ey; y++) {
    years.push(y)
  }
  years.forEach((y) => {
    persons.forEach((p, i) => {
      const d = new Date(p.birthday)
      const age = y - d.getFullYear()

      days[i][y] = {
        valid: age > 0,
        num: age,
        full: now > yearDay(y, d),
      }
    })
  })
  return { years, days }
}

function LifeBar({ bgnTime, endTime, persons }: Props) {
  const [grids, setGrids] = useState<{
    years: number[]
    days: Record<number, Age>[]
  }>({ years: [], days: [] })

  useEffect(() => {
    setGrids(calcGrid(bgnTime, endTime, persons))
  }, [bgnTime, endTime, persons])

  return (
    <Style>
      <div>
        <div
          className="yearbar"
          style={{
            gridTemplateColumns: `repeat(${grids.years.length}, minmax(0, 1fr))`,
          }}
        >
          {grids.years.map((y) => (
            <div key={y} data-gene={y % 10 === 0} className="cell">
              {y}
            </div>
          ))}
        </div>
        {persons.map((p, i) => (
          <div key={i} className="bar">
            {grids.years
              .map((y) => [y, grids.days[i][y]] as const)
              .map(([y, age]) => (
                <div
                  key={age.num}
                  className="cell"
                  data-valid={age.valid}
                  data-gene={y % 10 === 0}
                  data-num={age.num}
                  data-full={age.full}
                ></div>
              ))}
          </div>
        ))}
      </div>
    </Style>
  )
}
const Style = styled.div`
  padding-right: 8vw;
  img {
    width: 100%;
  }
  .yearbar,
  .bar {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
  }
  .yearbar {
    .cell {
      visibility: hidden;
      &[data-gene='true'] {
        visibility: visible;
      }
    }
  }
  .bar {
    .cell {
      border: solid gray;
      &[data-valid='true'] {
        border-color: yellow;
      }
      &[data-valid='true'][data-full='true'] {
        border-color: orange;
      }
    }
  }
`

export default LifeBar

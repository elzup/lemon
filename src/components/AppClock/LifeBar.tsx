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
  const currentYear = new Date().getFullYear()

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
      <div className="table">
        <div>
          <div>年</div>
          {persons.map((p, i) => (
            <div key={i}>{p.name}</div>
          ))}
        </div>
        {grids.years.map((y) => (
          <div
            key={y}
            data-gene={y % 10 === 0}
            data-current={currentYear === y}
            data-future={currentYear < y}
          >
            <div>{y}</div>
            {persons
              .map((p, i) => [y, grids.days[i][y]] as const)
              .map(([y, age], i) => (
                <div
                  key={i}
                  data-anniv={age.num % 10 === 0}
                  data-valid={age.valid}
                  data-full={age.full}
                >
                  {age.num}
                </div>
              ))}
          </div>
        ))}
      </div>
    </Style>
  )
}
const Style = styled.div`
  padding-right: 8vw;
  .yearbar,
  .bar {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    font-size: 2vw;
    color: #9c5fff;
  }
  .yearbar .cell {
    visibility: hidden;
    &[data-gene='true'] {
      visibility: visible;
    }
  }
  .bar .cell {
    background: gray;
    height: 10px;
    &[data-valid='true'] {
      background: yellow;
      &[data-full='true'] {
        background: orange;
      }
    }
    &[data-gene='true'] {
      border-left: 1px #9c5fff solid;
    }
  }
  .table {
    > div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 2fr;
      text-align: center;
      font-size: 1vh;
      > div {
        &[data-valid='false'] {
          color: gray;
        }
        &[data-valid='true'] {
          background: yellow;
          &[data-anniv='true'] {
            border-left: red solid;
          }
          &[data-full='true'] {
            background: orange;
          }
        }
      }

      &[data-gene='true'] {
        border-top: solid #9c5fff 2px;
      }
      &[data-current='true'] {
        border: solid green 2px;
        border-left: none;
      }
    }
  }
`

export default LifeBar

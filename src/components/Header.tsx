import React from 'react'

import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Style = styled.header`
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 10%;
  font-weight: bold;
  img {
    height: 1.6rem;
    margin: 4px 4px 0 0;
  }
`

type Props = {}
function Header() {
  return (
    <Style>
      <img src="/icon-4x.png" />
      <Typography variant="h6">レモポータル</Typography>
    </Style>
  )
}
export default Header

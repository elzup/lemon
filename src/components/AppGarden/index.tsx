import { Container, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { withAppli } from '../withAppli'
import TreePanel from './TreePanel'

const Style = styled.div`
  .games-box {
    column-count: 2;
    column-gap: 4px;
    column-fill: auto;
  }
`

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">庭</Typography>
        <TreePanel />
      </Container>
    </Style>
  )
}

const AppGamesPage = withAppli(Main)

export default AppGamesPage

import { Typography, Container } from '@material-ui/core'
import styled from 'styled-components'
import { SketchPicker, SwatchesPicker } from 'react-color'
import App from '../App'
import AuthContainer from '../AuthContainer'

const Style = styled.div`
  .img-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    > div {
      img {
        width: 100%;
      }
      border: solid gray 4px;
      border-radius: 12px;
      &[data-select] {
        border: solid orange 4px;
      }
    }
  }

  .swatches-picker {
    > div > div > div {
      height: 150px !important;
    }
    height: 150px !important;
    width: 100% !important;
  }
`

function Main() {
  return (
    <Style>
      <Container>
        <Typography variant="h5">アイコンメイク</Typography>
        <Typography variant="h6">イメージ</Typography>
        <div className="img-grid">
          <div data-select>
            <img src="/baseicon/lemon-atsu-face.png" />
          </div>
        </div>
        <Typography variant="h6">背景色</Typography>
        <SwatchesPicker
          onChange={(e) => {
            console.log(e)
          }}
        />
      </Container>
    </Style>
  )
}

function AppIconPageContainer() {
  return (
    <App>
      <AuthContainer />
      <Main />
    </App>
  )
}

export default AppIconPageContainer

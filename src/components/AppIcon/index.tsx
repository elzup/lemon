import { Typography, Container } from '@material-ui/core'
import styled from 'styled-components'
import SwatchesPicker from 'react-color/lib/components/swatches/Swatches'
import { useState, useRef, useEffect } from 'react'
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
  canvas {
    border: solid 1px gray;
  }
  #canvas-c {
    border-radius: 100%;
  }
`

const images = ['/baseicon/lemon-atsu-face.png']

function Main() {
  const [portrait, setPortrait] = useState<string>(images[0])
  const [color, setColor] = useState<string>('#ffffff0')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const background = new Image()

    background.src = portrait
    const canvasElem = canvasRef.current

    if (!canvasElem) return
    const ctx = canvasElem.getContext('2d')

    if (!ctx) return

    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height)
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height)
    ctx.drawImage(background, 0, 0, canvasElem.width, canvasElem.height)
    const ctx2 = canvas2Ref.current?.getContext('2d')

    if (!!ctx2) {
      ctx2.putImageData(
        ctx.getImageData(0, 0, canvasElem.width, canvasElem.height),
        0,
        0
      )
    }
  }, [portrait, color])

  return (
    <Style>
      <Container>
        <Typography variant="h5">アイコンメイク</Typography>
        <Typography variant="h6">イメージ</Typography>
        <div className="img-grid">
          {images.map((url) => (
            <div key={url} data-select={portrait === url}>
              <img src={url} />
            </div>
          ))}
        </div>
        <Typography variant="h6">背景色</Typography>
        <SwatchesPicker onChange={(e) => setColor(e.hex)} />
        <div style={{ marginTop: '8px' }}>
          <canvas ref={canvasRef} height={300} width={300} />
          <canvas id="canvas-c" ref={canvas2Ref} height={300} width={300} />
        </div>
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

import { Container, Typography } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import SwatchesPicker from 'react-color/lib/components/swatches/Swatches'
import styled from 'styled-components'
import { withAppli } from '../withAppli'

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
      &[data-select='true'] {
        border: solid orange 4px;
      }
    }
  }

  .swatches-picker {
    > div > div > div {
      height: 400px !important;
    }
    height: 400px !important;
    width: 100% !important;
  }
  .comp {
    img {
      border: dotted 1px gray;
      margin: 4px;
    }
  }
  canvas {
    display: none;
  }
  #canvas-c {
    border-radius: 100%;
  }
`

const images = [
  '/baseicon/lemon-mii.png',
  '/baseicon/lemon-atsu-face.png',
  '/baseicon/lemon-queen.png',
  '/baseicon/lemon-happy.png',
]

function Main() {
  const [portrait, setPortrait] = useState<string>(images[0])
  const [color, setColor] = useState<string>('#ffffff0')
  const [png, setPng] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    setPng(canvasElem.toDataURL())
  }, [portrait, color])

  return (
    <Style>
      <Container>
        <Typography variant="h5">アイコンメイク</Typography>
        <Typography variant="h6">イメージ</Typography>
        <div className="img-grid">
          {images.map((url) => (
            <div
              key={url}
              data-select={portrait === url}
              onClick={() => setPortrait(url)}
            >
              <img src={url} />
            </div>
          ))}
        </div>
        <Typography variant="h6">背景色</Typography>
        <SwatchesPicker onChange={(e) => setColor(e.hex)} />
        <Typography variant="h6">生成</Typography>
        {png && (
          <div
            className="comp"
            style={{ display: 'grid', justifyContent: 'center' }}
          >
            <img src={png} />
            <img id="canvas-c" src={png} />
          </div>
        )}
        <canvas ref={canvasRef} height={255} width={255} />
      </Container>
    </Style>
  )
}

const AppIconPage = withAppli(Main)

export default AppIconPage

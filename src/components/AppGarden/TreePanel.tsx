import { Button } from '@material-ui/core'
import { LocalDrink } from '@material-ui/icons'
import * as React from 'react'
import { useTree } from '../../service/firebase'
import { Random } from '../../utils'

function branch(
  angle: number,
  gen: number,
  c: CanvasRenderingContext2D,
  seed: number
) {
  c.save()
  c.strokeStyle = `hsl(${250 - gen}, 100%, 50%)`
  const r = new Random(seed)
  const randomRange = (min: number, max: number) => {
    const rv = r.nextInt(1, 1000) / 1000

    return rv * (max - min) + min
  }

  c.lineWidth = 6
  c.rotate(angle)
  c.beginPath()
  c.moveTo(0, 0)
  c.lineTo(100, 0)
  c.stroke()
  c.translate(100, 0)
  const scaleBase = randomRange(0.75, 1)
  const scale = gen < 10 ? (gen % 10) * 0.1 * scaleBase : scaleBase

  c.scale(scale, scale)

  if (gen > 0) {
    branch(randomRange(0, Math.PI / 4), gen - 10, c, r.nextInt(1, 10000))
    branch(randomRange(-Math.PI / 4, 0), gen - 10, c, r.nextInt(1, 10000))
  } else if (gen === 0) {
    if (true) {
      branch(randomRange(0, Math.PI / 4), gen - 10, c, r.nextInt(1, 10000))
      branch(randomRange(-Math.PI / 4, 0), gen - 10, c, r.nextInt(1, 10000))
      branch(randomRange(0, Math.PI / 4), gen - 10, c, r.nextInt(1, 10000))
      branch(randomRange(-Math.PI / 4, 0), gen - 10, c, r.nextInt(1, 10000))
      branch(randomRange(0, Math.PI / 4), gen - 10, c, r.nextInt(1, 10000))
    } else {
      c.fillStyle = '#fff'
      c.beginPath()
      c.arc(0, 0, 20, 0, Math.PI * 2, true)
      c.fill()
    }
  }
  c.restore()
}

function draw(c: CanvasRenderingContext2D, gen: number, seed: number) {
  if (gen < 0 || 140 < gen) return

  c.translate(400, 500)
  c.scale(0.5, 0.5)
  branch(-Math.PI / 2, gen, c, seed)
}

// type Props = {}
function TreePanel() {
  const [tree, addWater] = useTree()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!canvasRef.current) return
    canvasRef.current.width = 800
    canvasRef.current.height = 600
    const c = canvasRef.current.getContext('2d')

    if (!c || tree === null) return
    draw(c, tree.gen, tree.seed)
  }, [!canvasRef.current, tree])

  if (!tree) return <span></span>

  const h = new Date().getHours()
  const timeColor = `hsl(${h * 10 + 40}, 20%, 80%)`

  return (
    <div style={{ background: timeColor }}>
      <div style={{ padding: '8px' }}>
        <Button disabled={tree.wat >= 5} onClick={addWater}>
          水を上げる
        </Button>
        {[0, 1, 2, 3, 4].map((i) => (
          <LocalDrink key={i} color={tree.wat > i ? 'primary' : 'disabled'} />
        ))}
      </div>

      <section>
        <canvas style={{ width: '100%' }} ref={canvasRef} />
      </section>
    </div>
  )
}
export default TreePanel

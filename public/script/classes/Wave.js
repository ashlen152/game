class Wave {
  position = {
    x: 0,
    y: 0
  }
  dir = 0
  strengh = 0.2
  constructor(x, y, dir, strengh) {
    this.position.x = x
    this.position.y = y
    this.dir = dir
    this.strengh = strengh
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius * devicePixelRatio, 0, Math.PI * 2, false)
    ctx.fillStyle = 'grey'
    ctx.fill()
  }
}

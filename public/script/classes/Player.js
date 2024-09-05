class Player {
  position = {}

  constructor({ x, y, radius, color }) {
    console.log(x)
    this.position.x = x
    this.position.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius * devicePixelRatio, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

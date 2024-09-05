const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const socket = io();

const devicePixelRatio = window.devicePixelRatio || 1

const scoreEl = document.querySelector('#scoreEl')

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

const x = canvas.width / 2
const y = canvas.height / 2

const players = {}

let animationId

socket.on('updatePlayers', (remotePlayers) => {
  for (const id in remotePlayers) {
    const remotePlayer = remotePlayers[id]

    if (!players[id]) {
      players[id] = new Player({
        x: remotePlayer.position.x,
        y: remotePlayer.position.y,
        radius: 10,
        color: remotePlayer.color
      })
    }
    else {
      players[id].position = remotePlayer.position
    }
  }

  for (const id in players) {
    if (!remotePlayers[id]) {
      delete players[id]
    }
  }
})

const draw = () => {
  animationId = requestAnimationFrame(draw)
  ctx.fillStyle = 'rgba(0,0,0,0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (const id in players) {
    const player = players[id]
    player.draw()
  }
}

draw()



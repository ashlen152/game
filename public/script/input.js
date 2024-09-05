const SPEED = 5
const inputMeta = {
  'KeyW': {
    pressed: false,
    position: {
      x: 0,
      y: -SPEED
    }
  },
  'KeyA': {
    pressed: false,
    position: {
      x: -SPEED,
      y: 0
    }
  },
  'KeyD': {
    pressed: false,
    position: {
      x: SPEED,
      y: 0
    }
  },
  'KeyS': {
    pressed: false,
    position: {
      x: 0,
      y: SPEED
    }
  }
}

const triggerInput = (code, isPressed) => {
  const input = inputMeta[code]
  if (input) {
    input.pressed = isPressed
  }
}

setInterval(() => {
  if (players[socket.id]) {
    for (const value of Object.values(inputMeta)) {
      if (value.pressed) {
        players[socket.id].position.x += value.position.x
        players[socket.id].position.y += value.position.y
      }
    }
  }
  socket.emit('updateInput', inputMeta)
}, 15)

window.addEventListener('keydown', (e) => {
  triggerInput(e.code, true)
})

window.addEventListener('keyup', (e) => {
  triggerInput(e.code, false)
})

import express, { Express } from 'express'
import dotenv from 'dotenv'
import http from 'http'
import socket from 'socket.io'
import { join } from 'path'

dotenv.config()

const app: Express = express()
const server = http.createServer(app)
const port = process.env.PORT

const { Server } = socket
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

type Player = {
  position: {
    x: number,
    y: number
  }
  color: string
}


const players: Record<string, Player> = {}


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {

  const { id } = socket

  if (!players[id]) {
    players[id] = {
      position: {
        x: 500 * Math.random(),
        y: 500 * Math.random(),
      },
      color: `hsl(${360 * Math.random()}, 100%, 50%)`
    }
  }

  const { position, color } = players[id]

  console.log(`a user connected: ${id} color ${color} was spawn at x: ${position.x} y: ${position.y}`)

  io.emit('updatePlayers', players)

  socket.on('disconnect', (reason) => {
    console.log('a user diconnected: ', reason)
    delete players[socket.id]
    io.emit('updatePlayers', players)
  })
})
server.listen(port, () => { console.log(`[server]: Server is running at http://localhost:${port}`) })

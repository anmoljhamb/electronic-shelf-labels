import { WebSocketServer } from 'ws'
import http from 'http'

const server = http.createServer()
const wss1 = new WebSocketServer({ noServer: true })
const wss2 = new WebSocketServer({ noServer: true })

wss1.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const message = msg.toString('utf-8')
    console.log(message)
  })
  console.log('Websocket connection on wss1')
})

wss2.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const message = msg.toString('utf-8')
    console.log(message)
  })
  console.log('Websocket connection on wss2')
})

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url

  if (pathname === '/ws1') {
    wss1.handleUpgrade(request, socket, head, (ws) => {
      wss1.emit('connection', ws, request)
    })
  } else if (pathname === '/ws2') {
    wss2.handleUpgrade(request, socket, head, (ws) => {
      wss2.emit('connection', ws, request)
    })
  } else {
    socket.destroy()
  }
})

server.listen(8080, () => {
  console.log('listening on port 8080')
})

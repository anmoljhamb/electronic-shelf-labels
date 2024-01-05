import express, { Express, Request, Response } from 'express'
import http from 'http'
import WebSocket from 'ws'

const app: Express = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

wss.on('connection', (ws) => {
  console.log('web socket connected')

  ws.on('message', (msg) => {
    console.log(`recieved: ${msg}`)
  })

  ws.on('close', () => {
    console.log('client disconnected')
  })
})

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.listen(PORT, async () => {
  console.log('Server is running at http://localhost:8080')
})

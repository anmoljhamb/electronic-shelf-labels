import ws from 'ws'

const wss = new ws('ws://192.168.1.5:8080/ws2')
wss.on('open', () => {
  wss.send('hello')
})

import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: Express = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.listen(PORT, async () => {
  console.log('Server is running at http://localhost:8080')
})

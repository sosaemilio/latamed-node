import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes/index'
import mongodb from './db/connect'
import { auth } from 'express-openid-connect'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth(config))
app.use('/', routes)

mongodb.initDb((err: Error) => {
  console.log(err)
  app.listen(process.env.PORT ?? port, () => {
    console.log(`Web server is listening at port ${process.env.PORT ?? port}`)
  })
})

export default app

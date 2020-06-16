import express from 'express'
import bodyParser from 'body-parser'
import os from 'os'
import cors from 'cors'
import db from './models'
import api from './routes/api'

const app = express()

app.use(cors({
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))


// Parse url encoded data.
app.use(bodyParser.urlencoded({ extended: true }))

// Parse json data.
app.use(bodyParser.json())

// Serve static web content from build.
app.use(express.static('dist'))

// Serve data to client through the api path.
app.use('/api', api)

// Start sync with our postgres database.
db.sequelize.sync()

// Defaults to 8080 if port is not defined in env var.
const port = process.env.PORT || 8080

app.listen(port, () => {
  const hostname = os.hostname()
  console.log(`App listening at ${hostname}:${port}`)
})

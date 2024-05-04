import bodyParser from 'body-parser'
import express from 'express'

const app = express()
app.use(bodyParser.json())

const runServer = () => {
  try {
    app.listen(8888)
    console.log('Connection suceeded')
  } catch (error) {
    console.log(error)
  }
}

export default runServer
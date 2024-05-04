import bodyParser from 'body-parser'
import { app } from './api/v1/employees/route'

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
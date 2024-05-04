import express from 'express'
import cors from 'cors'

export const app = express()
app.use(cors())

app.get('/api/v1/employees', async (req, res) => {
  try {
    return res
      .status(200)
      .json({ data: 'returning employeee hierarchy data' })
  } catch (error) {
    console.error('Error getting employee data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

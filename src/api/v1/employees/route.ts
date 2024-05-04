import express from 'express'
import cors from 'cors'
import { employeeHandler } from './seed'

export const app = express()
app.use(cors())

app.get('/api/v1/hierarchy', async (req, res) => {
  try {
    const data = employeeHandler.getEmployeesHierarchyAndLevels()
    if (!data) {
      return res.status(404).json({ error: 'No data found' })
    }
    return res
      .status(200)
      .json({ data: employeeHandler.getEmployeesHierarchyAndLevels() })
  } catch (error) {
    console.error('Error getting employee data:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

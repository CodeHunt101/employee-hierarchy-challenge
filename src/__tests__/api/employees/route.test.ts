import supertest from 'supertest'
import { app } from '../../../api/v1/employees/route'

const request = supertest(app)

describe('GET /employees/', () => {
  it('should return dummy employee data', async () => {
    
    const response = await request.get(`/api/v1/employees`)
    expect(response.body.data).toEqual('returning employeee hierarchy data')
  })
})

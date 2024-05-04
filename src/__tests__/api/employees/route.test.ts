import supertest from 'supertest'
import { app } from '../../../api/v1/employees/route'

const request = supertest(app)

jest.mock('../../../api/v1/employees/seed', () => ({
  employeeHandler: {
    getEmployeesHierarchyAndLevels: jest.fn(),
  },
}))

import { employeeHandler } from '../../../api/v1/employees/seed'

describe('GET /hierarchy/', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return employee hierarchy', async () => {
    ;(
      employeeHandler.getEmployeesHierarchyAndLevels as jest.Mock
    ).mockImplementation(() => {
      return {
        employeesHierarchy: [
          { name: 'Bobby', id: 1, managerId: null, depth: 0 },
          { name: 'Darren', id: 2, managerId: 1, depth: 1 },
          { name: 'Harold', id: 3, managerId: 1, depth: 1 },
        ],
      }
    })
    const response = await request.get(`/api/v1/hierarchy`)
    expect(response.status).toEqual(200)
  })

  it('should return 404 if no data is found', async () => {
    ;(
      employeeHandler.getEmployeesHierarchyAndLevels as jest.Mock
    ).mockImplementation(() => {
      return null
    })
    const response = await request.get(`/api/v1/hierarchy`)
    console.log(response.body)

    expect(response.status).toEqual(404)
    expect(response.body.error).toEqual('No data found')
  })

  it('should return 500 if an error occurs', async () => {
    ;(
      employeeHandler.getEmployeesHierarchyAndLevels as jest.Mock
    ).mockImplementation(() => {
      throw new Error('Test error')
    })

    const response = await request.get(`/api/v1/hierarchy`)
    expect(response.status).toEqual(500)
    expect(response.body.error).toEqual('Internal Server Error')
  })
})

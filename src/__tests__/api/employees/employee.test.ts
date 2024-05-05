import { Employee } from '../../../api/v1/employees/employee'

describe('Employee class', () => {
  describe('Employee without manager id', () => {
    const employee = new Employee('Bobby', 1)

    it('correctly initialises name', () => {
      expect(employee.name).toBe('Bobby')
    })

    it('correctly initialises id', () => {
      expect(employee.id).toBe(1)
    })

    it('correctly initialises managerId', () => {
      expect(employee.managerId).toBeNull()
    })
  })

  describe('Employee with manager id', () => {
    const employee = new Employee('Darren', 1, 2)

    it('correctly initialises name', () => {
      expect(employee.name).toBe('Darren')
    })

    it('correctly initialises id', () => {
      expect(employee.id).toBe(1)
    })

    it('correctly initialises managerId', () => {
      expect(employee.managerId).toBe(2)
    })
  })
})

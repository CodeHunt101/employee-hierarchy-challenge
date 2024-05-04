import { EmployeeHandler } from '../../../api/v1/employees/employee-handler'
import { IdGenerator } from '../../../api/v1/employees/id-generator'

describe('EmployeeHandler class', () => {
  let employeeHandler: EmployeeHandler

  describe('existing employees', () => {
    beforeEach(() => {
      const idGenerator = new IdGenerator(10)
      employeeHandler = new EmployeeHandler(idGenerator)
    })
    describe('adding employees', () => {
      beforeEach(() => {
        const idGenerator = new IdGenerator(10)
        employeeHandler = new EmployeeHandler(idGenerator)
      })
      it('adds new employee CEO correctly', () => {
        const employee = employeeHandler.addEmployee('Darren')
        expect(employee.name).toBe('Darren')
      })
      it('returns null for managerId if employee is CEO', () => {
        const employee = employeeHandler.addEmployee('Darren')
        expect(employee.managerId).toBeNull()
      })

      it('adds employee with manager correctly', () => {
        const manager = employeeHandler.addEmployee('Manager')
        const employee = employeeHandler.addEmployee('Darren', manager.id)
        expect(employee.name).toBe('Darren')
      })

      it('returns manager id when it adds employee with manager', () => {
        const manager = employeeHandler.addEmployee('Manager')
        const employee = employeeHandler.addEmployee('Darren', manager.id)
        expect(employee.managerId).toBe(manager.id)
      })

      it('throws error when adding employee with empty name', () => {
        expect(() => employeeHandler.addEmployee('')).toThrow(
          'Employee name is required.'
        )
      })

      it('throws error when adding employee with invalid manager ID', () => {
        expect(() => employeeHandler.addEmployee('Darren', 999)).toThrow(
          'Invalid manager ID.'
        )
      })
    })
  })
})

import { Employee } from '../../../api/v1/employees/employee'

describe('Employee class', () => {
  const employee = new Employee('Bobby', 1, null)

  it('correctly initialises name', () => {
    expect(employee.name).toBe('Bobby')
  })

  it('correctly initialises id', () => {
    expect(employee.name).toBe('Bobby')
  })

  it('correctly initialises managerId', () => {
    expect(employee.managerId).toBeNull()
  })

  it('throws error when name is empty', () => {
    expect(() => new Employee('', 1, null)).toThrow(
      'Employee name cannot be empty'
    )
  })
})

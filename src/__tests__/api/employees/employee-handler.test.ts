import { EmployeeHandler } from '../../../api/v1/employees/employee-handler'
import { IdGenerator } from '../../../api/v1/employees/id-generator'
import { EmployeeHierarchy } from '../../../types/employee/employee.type'

describe('EmployeeHandler class', () => {
  let employeeHandler: EmployeeHandler

  describe('existing employees', () => {
    beforeEach(() => {
      const idGenerator = new IdGenerator(10)
      employeeHandler = new EmployeeHandler(idGenerator)
    })
    it('returns correct existing employee IDs', () => {
      employeeHandler.addEmployee('Bobby')
      employeeHandler.addEmployee('Darren')
      const existingIds = employeeHandler.getExistingEmployeeIds()
      expect(existingIds.size).toBe(2)
    })

    it('returns existing employee IDs including added IDs', () => {
      employeeHandler.addEmployee('Bobby')
      employeeHandler.addEmployee('Darren')
      const existingIds = employeeHandler.getExistingEmployeeIds()
      expect(Array.from(existingIds)).toEqual(expect.arrayContaining([1, 2]))
    })
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

  describe('employee hierarchy', () => {
    beforeEach(() => {
      const idGenerator = new IdGenerator(10)
      employeeHandler = new EmployeeHandler(idGenerator)
    })

    it('correctly returns the length of the hierarchy data', () => {
      const manager = employeeHandler.addEmployee('CEO')
      const employee1 = employeeHandler.addEmployee('Employee 1', manager.id)
      employeeHandler.addEmployee('Employee 2', manager.id)
      employeeHandler.addEmployee('Employee 3', employee1.id)
      const hierarchy =
        employeeHandler.getEmployeesHierarchyAndLevels().employeesHierarchy
      expect(hierarchy.length).toBe(4)
    })

    it('correctly builds employee hierarchy', () => {
      const manager = employeeHandler.addEmployee('Manager')
      const employee1 = employeeHandler.addEmployee('Employee 1', manager.id)
      const employee2 = employeeHandler.addEmployee('Employee 2', manager.id)
      const employee3 = employeeHandler.addEmployee('Employee 3', employee1.id)

      const expectedHierarchy: EmployeeHierarchy[] = [
        { id: manager.id, name: 'Manager', managerId: null, depth: 0 },
        {
          id: employee2.id,
          name: 'Employee 2',
          managerId: manager.id,
          depth: 1,
        },
        {
          id: employee1.id,
          name: 'Employee 1',
          managerId: manager.id,
          depth: 1,
        },
        {
          id: employee3.id,
          name: 'Employee 3',
          managerId: employee1.id,
          depth: 2,
        },
      ]

      const actualHierarchy =
        employeeHandler.getEmployeesHierarchyAndLevels().employeesHierarchy

      expect(actualHierarchy).toEqual(expectedHierarchy)
    })

    it('correctly calculates hierarchy depth', () => {
      const hierarchy: EmployeeHierarchy[] = [
        { id: 1, name: 'Manager', managerId: null, depth: 0 },
        { id: 2, name: 'Employee 1', managerId: 1, depth: 1 },
        { id: 3, name: 'Employee 2', managerId: 1, depth: 1 },
        { id: 4, name: 'Employee 3', managerId: 2, depth: 2 },
      ]

      const depth = EmployeeHandler.getHierarchyDepth(hierarchy)
      expect(depth).toBe(2)
    })
  })
})

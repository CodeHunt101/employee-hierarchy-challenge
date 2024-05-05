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
      employeeHandler.addEmployee({ name: 'Bobby' })
      employeeHandler.addEmployee({ name: 'Darren' })
      const existingIds = employeeHandler.getExistingEmployeeIds()
      expect(existingIds.size).toBe(2)
    })

    it('returns existing employee IDs including added IDs', () => {
      employeeHandler.addEmployee({ name: 'Bobby' })
      employeeHandler.addEmployee({ name: 'Darren' })
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
      const employee = employeeHandler.addEmployee({ name: 'Darren' })
      expect(employee.name).toBe('Darren')
    })
    it('returns null for managerId if employee is CEO', () => {
      const employee = employeeHandler.addEmployee({ name: 'Darren' })
      expect(employee.managerId).toBeNull()
    })

    it('adds employee with manager correctly', () => {
      const manager = employeeHandler.addEmployee({ name: 'Bobby' })
      const employee = employeeHandler.addEmployee({
        name: 'Darren',
        managerId: manager.id,
      })
      expect(employee.name).toBe('Darren')
    })

    it('returns manager id when it adds employee with manager', () => {
      const manager = employeeHandler.addEmployee({ name: 'Bobby' })
      const employee = employeeHandler.addEmployee({
        name: 'Darren',
        managerId: manager.id,
      })
      expect(employee.managerId).toBe(manager.id)
    })

    it('throws error when adding employee with empty name', () => {
      expect(() => employeeHandler.addEmployee({ name: '' })).toThrow(
        'Employee name is required.'
      )
    })
  })

  describe('employee hierarchy', () => {
    beforeEach(() => {
      const idGenerator = new IdGenerator(10)
      employeeHandler = new EmployeeHandler(idGenerator)
    })

    it('correctly returns the length of the hierarchy data', () => {
      const manager = employeeHandler.addEmployee({ name: 'CEO' })
      const employee1 = employeeHandler.addEmployee({
        name: 'Employee 1',
        managerId: manager.id,
      })
      employeeHandler.addEmployee({ name: 'Employee 2', managerId: manager.id })
      employeeHandler.addEmployee({
        name: 'Employee 3',
        managerId: employee1.id,
      })
      const hierarchy =
        employeeHandler.getEmployeesHierarchyAndLevels().employeesHierarchy
      expect(hierarchy.length).toBe(4)
    })

    it('correctly builds employee hierarchy', () => {
      const manager = employeeHandler.addEmployee({ name: 'Bobby' })
      const employee1 = employeeHandler.addEmployee({
        name: 'Employee 1',
        managerId: manager.id,
      })
      const employee2 = employeeHandler.addEmployee({
        name: 'Employee 2',
        managerId: manager.id,
      })
      const employee3 = employeeHandler.addEmployee({
        name: 'Employee 3',
        managerId: employee1.id,
      })

      const expectedHierarchy: EmployeeHierarchy[] = [
        { id: manager.id, name: 'Bobby', managerId: null, depth: 0 },
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
        {
          id: employee2.id,
          name: 'Employee 2',
          managerId: manager.id,
          depth: 1,
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

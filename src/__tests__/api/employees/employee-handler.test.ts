import { EmployeeHandler } from '../../../api/v1/employees/employee-handler'
import { IdGenerator } from '../../../api/v1/employees/id-generator'
import {
  EmployeeHierarchy,
  EmployeeInput,
} from '../../../types/employee/employee.type'

describe('EmployeeHandler class', () => {
  describe('existing employees', () => {
    const employeesDataMock: EmployeeInput[] = [
      {
        name: 'Bobby',
      },
      {
        name: 'Darren',
      },
    ]
    const idGenerator = new IdGenerator(10)
    const employeeHandler = new EmployeeHandler(idGenerator, employeesDataMock)
    const existingIds = employeeHandler.getExistingEmployeeIds()

    it('returns correct existing employee IDs', () => {
      expect(existingIds.size).toBe(2)
    })

    it('returns existing employee IDs including added IDs', () => {
      expect(Array.from(existingIds)).toEqual(expect.arrayContaining([1, 2]))
    })
  })

  describe('adding employees', () => {
    const employeesDataMock: EmployeeInput[] = [
      {
        name: 'Bobby',
        managerId: 1,
        id: 1,
      },
      {
        name: 'Darren',
        id: 2,
      },
    ]
    const idGenerator = new IdGenerator(10)
    const employeeHandler = new EmployeeHandler(idGenerator, employeesDataMock)
    const employees = employeeHandler.getExistingEmployees()
    it('adds new employee CEO correctly', () => {
      const CEO = employeesDataMock[1]
      expect(employees.find((e) => e.id === CEO.id)).toBeTruthy()
    })
    it('returns null for managerId if employee is CEO', () => {
      const CEO = employeesDataMock[1]
      expect(employees.find((e) => e.id === CEO.id)?.managerId).toBeNull()
    })

    it('adds employee with manager correctly', () => {
      const employeeWithManagerId = employeesDataMock[1]
      expect(
        employees.find((e) => e.id === employeeWithManagerId.id)
      ).toBeTruthy()
    })

    it('throws error when adding employee with empty name', () => {
      const employeesIncorrectDataMock: EmployeeInput[] = [
        {
          name: '',
        },
      ]
      const idGenerator = new IdGenerator(10)
      expect(
        () => new EmployeeHandler(idGenerator, employeesIncorrectDataMock)
      ).toThrow(`Employee name is required.`)
    })
    it('throws error when adding employee with invalid id format', () => {
      const employeesIncorrectDataMock: EmployeeInput[] = [
        {
          name: 'Darren',
          id: 0.5,
        },
      ]
      const idGenerator = new IdGenerator(10)
      expect(
        () => new EmployeeHandler(idGenerator, employeesIncorrectDataMock)
      ).toThrow('ID provided: 0.5, must be a positive integer')
    })

    it('throws error when adding employee with invalid managerId format', () => {
      const employeesIncorrectDataMock: EmployeeInput[] = [
        {
          name: 'Bobby',
          id: 1,
          managerId: 1,
        },
        {
          name: 'Darren',
          id: 2,
          managerId: -1,
        },
      ]
      const idGenerator = new IdGenerator(10)
      expect(
        () => new EmployeeHandler(idGenerator, employeesIncorrectDataMock)
      ).toThrow('Manager ID provided: -1, must be a positive integer')
    })
  })

  describe('employee hierarchy', () => {
    const employeesDataMock: EmployeeInput[] = [
      {
        name: 'Bobby',
        managerId: 2,
        id: 1,
      },
      {
        name: 'Darren',
        id: 2,
      },
      {
        name: 'Ella',
        managerId: 2,
      },
      {
        name: 'Harold',
        id: 4,
        managerId: 3,
      },
    ]
    const idGenerator = new IdGenerator(10)
    const employeeHandler = new EmployeeHandler(idGenerator, employeesDataMock)
    it('correctly returns the length of the hierarchy data', () => {
      const hierarchy =
        employeeHandler.getEmployeesHierarchyAndLevels().employeesHierarchy
      expect(hierarchy.length).toBe(4)
    })

    it('correctly builds employee hierarchy', () => {
      const expectedHierarchy: EmployeeHierarchy[] = [
        { id: 2, name: 'Darren', managerId: null, depth: 0 },
        {
          id: 1,
          name: 'Bobby',
          managerId: 2,
          depth: 1,
        },
        {
          id: 3,
          name: 'Ella',
          managerId: 2,
          depth: 1,
        },
        {
          id: 4,
          name: 'Harold',
          managerId: 3,
          depth: 2,
        },
      ]

      const actualHierarchy =
        employeeHandler.getEmployeesHierarchyAndLevels().employeesHierarchy

      expect(actualHierarchy).toEqual(expectedHierarchy)
    })

    it('throws error when an employee has an invalid manager id', () => {
      const employeesDataMock: EmployeeInput[] = [
        {
          name: 'Bobby',
          managerId: 50,
          id: 1,
        },
        {
          name: 'Darren',
          id: 2,
        },
      ]
      const idGenerator = new IdGenerator(10)
      const employeeHandler = new EmployeeHandler(
        idGenerator,
        employeesDataMock
      )

      expect(() => employeeHandler.getEmployeesHierarchyAndLevels()).toThrow(
        'Some employees do not have a valid manager Id'
      )
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

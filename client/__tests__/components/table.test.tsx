import React from 'react'
import { render, screen } from '@testing-library/react'
import Table from 'app/components/table'
import {
  EmployeeHierarchy,
  EmployeesHierarchyData,
} from '../../../src/types/employee/employee.type'
import { EmployeeHandler } from '../../../src/api/v1/employees/employee-handler'

describe('Table component', () => {
  const employeesHierarchy: EmployeeHierarchy[] = [
    { id: 1, name: 'Darren', managerId: null, depth: 0 },
    { id: 2, name: 'Bobby', managerId: 1, depth: 1 },
    { id: 3, name: 'Harold', managerId: 2, depth: 2 },
    { id: 4, name: 'Ella', managerId: 2, depth: 2 },
    { id: 5, name: 'Natalie', managerId: 4, depth: 3 },
  ]
  const hierarchyMock: EmployeesHierarchyData = {
    employeesHierarchy,
    maxDepth: EmployeeHandler.getHierarchyDepth(employeesHierarchy),
  }
  describe('Table rendering', () => {
    it('renders without errors', () => {
      const hierarchy = { employeesHierarchy: [], maxDepth: 0 }
      render(<Table hierarchy={hierarchy} />)
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('renders the correct number of rows based on employees', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const rows = screen.getAllByRole('row')
      expect(rows.length).toBe(hierarchyMock.employeesHierarchy.length)
    })

    it('renders the correct hierarchy levels with empty cells', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const anyRow = screen.getAllByRole('row')[1]
      expect(anyRow.querySelectorAll('td')).toHaveLength(
        hierarchyMock.maxDepth + 1
      )
    })
  })

  describe('Order of employee names', () => {
    it('expects CEO (employee with no managerId) to be in the first row', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const CEOLevelDepth = 0
      const CEOEmployee = hierarchyMock.employeesHierarchy.find(
        (h) => h.depth === CEOLevelDepth
      )
      if (!CEOEmployee) {
        throw new Error('Could not find employee')
      }

      const CEOEmployeeRowElement = findEmployeeRowTdElement(
        employeesHierarchy,
        CEOEmployee
      )
      expect(CEOEmployee.name).toEqual(CEOEmployeeRowElement.textContent)
    })
    it('expects CEO (employee with no managerId) to be in the first cell', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const cells = screen.getAllByRole('cell')
      const CEOLevelDepth = 0
      const CEOEmployee = hierarchyMock.employeesHierarchy.find(
        (h) => h.depth === CEOLevelDepth
      )?.name
      if (!CEOEmployee) {
        throw new Error('Could not find employee')
      }
      expect(CEOEmployee).toEqual(cells[0].textContent)
    })
    it('expects second-level employee (who has the CEO id as manager id) to be the second value in their respective row', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const secondLevelEmployeeDepth = 1
      const secondLevelEmployee = hierarchyMock.employeesHierarchy.find(
        (h) => h.depth === secondLevelEmployeeDepth
      )
      if (!secondLevelEmployee) {
        throw new Error('Could not find employee')
      }
      const lowestEmployeeRowElement = findEmployeeRowTdElement(
        employeesHierarchy,
        secondLevelEmployee
      )
      expect(secondLevelEmployee.name).toEqual(
        lowestEmployeeRowElement.textContent
      )
    })
    it('expects lowest level employee to be the last value in their row', () => {
      render(<Table hierarchy={hierarchyMock} />)
      const lowestLevelEmployee = hierarchyMock.employeesHierarchy.find(
        (h) => h.depth === hierarchyMock.maxDepth
      )
      if (!lowestLevelEmployee) {
        throw new Error('Could not find employee')
      }
      const lowestEmployeeRowElement = findEmployeeRowTdElement(
        employeesHierarchy,
        lowestLevelEmployee
      )
      expect(lowestLevelEmployee.name).toEqual(
        lowestEmployeeRowElement.textContent
      )
    })
  })
})

function findEmployeeRowTdElement(
  employeesHierarchy: EmployeeHierarchy[],
  employee: EmployeeHierarchy
) {
  const employeeIndex = employeesHierarchy.findIndex((e) => e === employee)
  const employeeRow = screen.getAllByRole('row')[employeeIndex]
  return employeeRow.querySelectorAll('td')[employee.depth]
}

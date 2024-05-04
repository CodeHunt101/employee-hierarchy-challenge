import {
  EmployeeHierarchy,
  EmployeesHierarchyData,
} from '../../../types/employee/employee.type'
import { Employee } from './employee'
import { IdGenerator } from './id-generator'

export class EmployeeHandler {
  private employees: Employee[]
  private existingIds: Set<number> = new Set()
  private idGenerator: IdGenerator

  constructor(idGenerator: IdGenerator) {
    this.employees = []
    this.idGenerator = idGenerator
  }

  getExistingEmployeeIds() {
    return this.existingIds
  }

  addEmployee(name: string, managerId: number | null = null): Employee {
    if (!name) {
      throw new Error('Employee name is required.')
    }

    if (
      managerId !== null &&
      !this.employees.some((emp) => emp.id === managerId)
    ) {
      throw new Error('Invalid manager ID.')
    }
    const id = this.idGenerator.generateUniqueId()
    this.existingIds.add(id)
    const employee = new Employee(name, id, managerId)
    this.employees.push(employee)
    return employee
  }

  // Method to build a flat list but with depth information
  private buildEmployeesHierarchy(
    managerId: number | null = null
  ): EmployeeHierarchy[] {
    const employeesHierarchy: EmployeeHierarchy[] = []
    const stack: { employee: Employee; depth: number }[] = []

    // Push the root employees (those with no manager) onto the stack
    this.employees
      .filter((e) => e.managerId === managerId)
      .forEach((e) => stack.push({ employee: e, depth: 0 }))

    // Iterate over the stack until it's empty
    while (stack.length > 0) {
      const { employee, depth } = stack.pop()!
      employeesHierarchy.push({ ...employee, depth })

      // Push the direct reports of the current employee onto the stack
      this.employees
        .filter((e) => e.managerId === employee.id)
        .forEach((e) => stack.push({ employee: e, depth: depth + 1 }))
    }

    return employeesHierarchy
  }

  getEmployeesHierarchyAndLevels(): EmployeesHierarchyData {
    const employeesHierarchy = this.buildEmployeesHierarchy()
    return {
      employeesHierarchy,
      maxDepth: EmployeeHandler.getHierarchyDepth(employeesHierarchy),
    }
  }

  static getHierarchyDepth(employeesHierarchy: EmployeeHierarchy[]) {
    let maxDepth = 0
    employeesHierarchy.forEach((employee) => {
      if (employee.depth > maxDepth) {
        maxDepth = employee.depth
      }
    })
    return maxDepth
  }
}

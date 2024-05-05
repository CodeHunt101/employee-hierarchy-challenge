import {
  EmployeeHierarchy,
  EmployeeInput,
  EmployeesHierarchyData,
} from '../../../types/employee/employee.type'
import { Employee } from './employee'
import { IdGenerator } from './id-generator'

export class EmployeeHandler {
  private employees: Employee[]
  private existingIds: Set<number> = new Set()
  private idGenerator: IdGenerator

  constructor(idGenerator: IdGenerator, employeesData: EmployeeInput[]) {
    this.employees = []
    this.idGenerator = idGenerator
    this.seedEmployees(employeesData)
  }

  getExistingEmployeeIds() {
    return this.existingIds
  }

  getExistingEmployees() {
    return this.employees
  }

  private seedEmployees(employeesData: EmployeeInput[]) {
    employeesData.forEach(({ name, id, managerId }) => {
      this.addEmployee({ name, id, managerId })
    })
  }

  private addEmployee({ name, id, managerId }: EmployeeInput): Employee {
    this.verifyEmployeeDataFormat(name, id, managerId)
    const idGenerated = this.idGenerator.generateUniqueId(id)
    this.existingIds.add(idGenerated)
    const employee = new Employee(name, idGenerated, managerId)
    this.employees.push(employee)
    return employee
  }

  private verifyEmployeeDataFormat(
    name: string,
    id?: number,
    managerId?: number
  ) {
    if (name === '') {
      throw Error('Employee name is required.')
    }
    if (id) {
      this.idGenerator.checkIdValidity(id)
    }
    if (managerId) {
      this.idGenerator.checkIdValidity(managerId, true)
    }
  }

  private buildEmployeesHierarchy(
    managerId: number | null = null,
    depth = 0
  ): EmployeeHierarchy[] {
    this.validateManagerIds()
    const employeesHierarchy: EmployeeHierarchy[] = []

    // Filter employees based on the provided managerId to get subordinates
    const subordinates = this.employees.filter(
      (employee: Employee) => employee.managerId === managerId
    )

    // Iterate through subordinates to build hierarchy recursively
    subordinates.forEach((subordinate: Employee) => {
      // Create a hierarchy object for the current subordinate with depth information
      const subordinateHierarchy: EmployeeHierarchy = { ...subordinate, depth }

      // Recursively build hierarchy for subordinates of the current subordinate
      const subordinatesOfSubordinate = this.buildEmployeesHierarchy(
        subordinate.id,
        depth + 1
      )

      // Add current subordinate and its subordinates to the hierarchy list
      employeesHierarchy.push(
        subordinateHierarchy,
        ...subordinatesOfSubordinate
      )
    })

    return employeesHierarchy
  }

  getEmployeesHierarchyAndLevels(): EmployeesHierarchyData {
    const employeesHierarchy = this.buildEmployeesHierarchy()
    return {
      employeesHierarchy,
      maxDepth: EmployeeHandler.getHierarchyDepth(employeesHierarchy),
    }
  }

  private validateManagerIds() {
    const existingIds = this.existingIds
    this.employees.forEach((emp) => {
      if (emp.managerId && !existingIds.has(emp.managerId)) {
        throw new Error('Some employees do not have a valid manager Id')
      }
    })
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

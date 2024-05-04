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
}

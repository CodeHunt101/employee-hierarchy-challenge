import { Employee } from '../../api/v1/employees/employee'

export type EmployeeHierarchy = Employee & {
  depth: number
}

export type EmployeesHierarchyData = {
  employeesHierarchy: EmployeeHierarchy[]
  maxDepth: number
}

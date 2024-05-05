import { EmployeeHandler } from './employee-handler'
import { IdGenerator } from './id-generator'

const idGenerator = new IdGenerator(500)
export const employeeHandler = new EmployeeHandler(idGenerator)

employeeHandler.addEmployee({ name: 'Alan', id: 100, managerId: 150 }) // Manager ID can be null for top-level employees
employeeHandler.addEmployee({ name: 'Martin', id: 220, managerId: 100 })
employeeHandler.addEmployee({ name: 'Jamie', id: 150 })
employeeHandler.addEmployee({ name: 'Alex', id: 275, managerId: 100 })
employeeHandler.addEmployee({ name: 'Steve', id: 400, managerId: 150 })
employeeHandler.addEmployee({ name: 'David', id: 190, managerId: 400 })

function generateRandomManagerId() {
  const randomIndex = Math.floor(
    Math.random() * employeeHandler.getExistingEmployeeIds().size
  )
  return Array.from(employeeHandler.getExistingEmployeeIds())[randomIndex]
}

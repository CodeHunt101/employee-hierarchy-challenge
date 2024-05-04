import { EmployeeHandler } from './employee-handler'
import { IdGenerator } from './id-generator'

const idGenerator = new IdGenerator(100)
export const employeeHandler = new EmployeeHandler(idGenerator)

employeeHandler.addEmployee('Alan') // Manager ID can be null for top-level employees
employeeHandler.addEmployee('Martin', generateRandomManagerId())
employeeHandler.addEmployee('Jamie', generateRandomManagerId())
employeeHandler.addEmployee('Jacob', generateRandomManagerId())
employeeHandler.addEmployee('Alex', generateRandomManagerId())
employeeHandler.addEmployee('Steve', generateRandomManagerId())
employeeHandler.addEmployee('David', generateRandomManagerId())
employeeHandler.addEmployee('Marcus', generateRandomManagerId())
employeeHandler.addEmployee('Bobby', generateRandomManagerId())
employeeHandler.addEmployee('Darren', generateRandomManagerId())
employeeHandler.addEmployee('Ella', generateRandomManagerId())
employeeHandler.addEmployee('Nando', generateRandomManagerId())
employeeHandler.addEmployee('Andrea', generateRandomManagerId())

function generateRandomManagerId() {
  const randomIndex = Math.floor(
    Math.random() * employeeHandler.getExistingEmployeeIds().size
  )
  return Array.from(employeeHandler.getExistingEmployeeIds())[randomIndex]
}

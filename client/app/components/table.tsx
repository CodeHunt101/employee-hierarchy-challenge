import {
  EmployeesHierarchyData,
  EmployeeHierarchy,
} from '../../../src/types/employee/employee.type'
import TableRow from './table-row'

type TableProps = {
  hierarchy: EmployeesHierarchyData
}

const Table = ({ hierarchy }: TableProps) => {
  const { employeesHierarchy, maxDepth } = hierarchy

  return (
    <table className="table">
      <tbody>
        {employeesHierarchy.map(
          (employee: EmployeeHierarchy, index: number) => (
            <TableRow
              key={index}
              name={employee.name}
              employeeDepth={employee.depth}
              maxDepth={maxDepth}
            />
          )
        )}
      </tbody>
    </table>
  )
}

export default Table

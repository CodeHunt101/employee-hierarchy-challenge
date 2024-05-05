import { EmployeesHierarchyData } from '../../../src/types/employee/employee.type'

const Table = ({ hierarchy }: { hierarchy: EmployeesHierarchyData }) => {
  const { maxDepth, employeesHierarchy } = hierarchy
  const totalEmployees = employeesHierarchy.length

  // Generate table rows
  const tableRows = []
  for (let rowIndex = 0; rowIndex < totalEmployees; rowIndex++) {
    const { name, depth } = employeesHierarchy[rowIndex]
    const rowData = []

    // Add empty cells for hierarchy levels above
    for (let cellIndex = 0; cellIndex < depth; cellIndex++) {
      rowData.push(<td key={cellIndex}></td>)
    }

    // Add employee name
    rowData.push(<td key={depth}>{name}</td>)

    // Add empty cells for hierarchy levels below
    for (let cellIndex = depth + 1; cellIndex <= maxDepth; cellIndex++) {
      rowData.push(<td key={cellIndex}></td>)
    }

    tableRows.push(<tr key={rowIndex}>{rowData}</tr>)
  }

  return (
    <table className='table'>
      <tbody>{tableRows}</tbody>
    </table>
  )
}

export default Table

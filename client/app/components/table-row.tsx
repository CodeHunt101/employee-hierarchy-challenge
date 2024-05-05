type TableRowProps = {
  name: string
  employeeDepth: number
  maxDepth: number
}

const TableRow = ({ name, employeeDepth, maxDepth }: TableRowProps) => {
  const renderEmptyCells = (count: number, className: string) => {
    return Array.from({ length: count }, (_, index) => (
      <td className={className} key={index}></td>
    ))
  }

  const emptyCellsBefore = renderEmptyCells(employeeDepth, 'empty-before')
  const emptyCellsAfter = renderEmptyCells(
    maxDepth - employeeDepth,
    'empty-after'
  )

  return (
    <tr>
      {emptyCellsBefore}
      <td className="filled-cell">
        <b>{name}</b>
      </td>
      {emptyCellsAfter}
    </tr>
  )
}

export default TableRow

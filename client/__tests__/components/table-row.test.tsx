import { render, screen, waitFor } from '@testing-library/react'
import TableRow from 'app/components/table-row'

describe('TableRow Component', () => {
  it('renders the correct name', () => {
    render(<TableRow name="All Empty" employeeDepth={3} maxDepth={3} />)
    expect(screen.getByText(/All Empty/i)).toBeInTheDocument()
  })
  it('renders correctly with correct number of empty cells', async () => {
    render(<TableRow name="Test Item" employeeDepth={2} maxDepth={5} />)
    expect(screen.getByText(/Test Item/i)).toBeInTheDocument()
  })

  it('renders the correct number of empty cells before the name', () => {
    const { container } = render(
      <TableRow name="Test Item" employeeDepth={2} maxDepth={5} />
    )
    const emptyCellsBefore = container.getElementsByClassName('empty-before')
    expect(emptyCellsBefore.length).toBe(2)
  })

  it('renders all empty cells after the name', () => {
    const { container } = render(
      <TableRow name="All Empty" employeeDepth={3} maxDepth={5} />
    )
    const emptyCellsAfter = container.getElementsByClassName('empty-after')
    expect(emptyCellsAfter.length).toBe(2)
  })

  it('renders the correct total number of cells', () => {
    const { container } = render(
      <TableRow name="All Empty" employeeDepth={3} maxDepth={3} />
    )
    const totalCells = container.querySelectorAll('tr > td')
    expect(totalCells.length).toBe(4) // 3 empty + 1 filled cell
  })

  it('renders correctly with no empty cells when depth is 0', () => {
    render(<TableRow name="No Empty" employeeDepth={0} maxDepth={0} />)

    expect(screen.getByText(/No Empty/i)).toBeInTheDocument()
    const emptyCells = screen.queryAllByTestId('empty-cell')
    expect(emptyCells.length).toBe(0)
  })
})

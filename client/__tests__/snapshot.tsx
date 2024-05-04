import { render } from '@testing-library/react'
import Table from 'app/components/table'
import OrganisationChart from 'app/page'
import { EmployeesHierarchyData } from '../../src/types/employee/employee.type'
const mockHierarchy: EmployeesHierarchyData = {
  employeesHierarchy: [
    { id: 1, name: 'Darren', managerId: null, depth: 0 },
    { id: 2, name: 'Bobby', managerId: 1, depth: 1 },
  ],
  maxDepth: 1,
}

it('renders organisation chart unchanged', () => {
  const { container } = render(<OrganisationChart />)
  expect(container).toMatchSnapshot()
})

it('renders table unchanged', () => {
  const { container } = render(<Table hierarchy={mockHierarchy} />)
  expect(container).toMatchSnapshot()
})

/**
 * @jest-environment jsdom
 */
import { render, waitFor, screen } from '@testing-library/react'
import { act } from 'react'
import OrganisationChart from 'app/page'
import {
  EmployeeHierarchy,
  EmployeesHierarchyData,
} from '../../src/types/employee/employee.type'
import { EmployeeHandler } from '../../src/api/v1/employees/employee-handler'

const mockFetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ data: { employeesHierarchy: [], levels: 0 } }),
  })
)

global.fetch = mockFetch as jest.Mock

describe('OrganisationChart component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })
  describe('Table rendering', () => {})
  it('renders the loading state before employee hierarchy data is retrieved', () => {
    act(() => {
      render(<OrganisationChart />)
    })
    expect(screen.getByRole('span')).toBeInTheDocument()
  })
  it('displays error message when failed to fetch employee data', async () => {
    const errorMessage = 'Failed to load data'
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    )
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() =>
      expect(screen.getByRole('heading')).toHaveTextContent(errorMessage)
    )
  })
  it('renders a table without crashing', async () => {
    const mockHierarchy: EmployeesHierarchyData = {
      employeesHierarchy: [
        { id: 1, name: 'Darren', managerId: null, depth: 0 },
        { id: 2, name: 'Bobby', managerId: 1, depth: 1 },
      ],
      maxDepth: 1,
    }
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockHierarchy }),
      })
    )
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument())
  })

  it('fetches employees data from API', async () => {
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1))
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8888/api/v1/hierarchy'
    )
  })

  it('passes correct hierarchy data to Table component', async () => {
    const mockHierarchy: EmployeesHierarchyData = {
      employeesHierarchy: [
        { id: 1, name: 'Darren', managerId: null, depth: 0 },
        { id: 2, name: 'Bobby', managerId: 1, depth: 1 },
      ],
      maxDepth: 1,
    }
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockHierarchy }),
      })
    )
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() => expect(screen.getByText('Bobby')).toBeInTheDocument())
  })

  it('renders the correct information when there are no employee hierarchy data', async () => {
    const employeesHierarchy: EmployeeHierarchy[] = []
    const emptyHierarchyMock = {
      employeesHierarchy,
      maxDepth: EmployeeHandler.getHierarchyDepth(employeesHierarchy),
    }
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: emptyHierarchyMock }),
      })
    )
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() =>
      expect(screen.getByRole('heading')).toHaveTextContent(
        'No employees found'
      )
    )
  })

  it('renders the correct information in case the data returned is falsy', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: null }),
      })
    )
    act(() => {
      render(<OrganisationChart />)
    })
    await waitFor(() =>
      expect(screen.getByRole('heading')).toHaveTextContent(
        'No employees found'
      )
    )
  })
})

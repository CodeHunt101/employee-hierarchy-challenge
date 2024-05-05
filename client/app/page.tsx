'use client'

import { useEffect, useState } from 'react'
import Table from './components/table'
import { EmployeesHierarchyData } from '../../src/types/employee/employee.type'
import Spinner from './components/spinner'

const OrganisationChart = () => {
  const [hierarchy, setHierarchy] = useState<EmployeesHierarchyData>({
    employeesHierarchy: [],
    maxDepth: 0,
  })
  const [error, setError] = useState<string>('')
  const [loading, isLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/v1/hierarchy')
        const jsonResponse = await response.json()
        const employeesHierarchy: EmployeesHierarchyData =
          jsonResponse.data ?? hierarchy
        setHierarchy(employeesHierarchy)
      } catch (error) {
        setError('Failed to load data')
      } finally {
        isLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  if (error) {
    return <h1>{error}</h1>
  }

  if (hierarchy.employeesHierarchy.length === 0 && !loading) {
    return <h1>No employees found</h1>
  }

  return (
    <main className="flex justify-center">
      <div className="prose m-10">
        <h1>Organisation hierarchy</h1>
        {loading && <Spinner/>}
        <Table hierarchy={hierarchy} />
      </div>
    </main>
  )
}

export default OrganisationChart

export class Employee {
  name: string
  id: number
  managerId?: number | null

  constructor(name: string, id: number, managerId?: number) {
    if (name === '') {
      throw Error('Employee name cannot be empty')
    }
    this.name = name
    this.id = id
    this.managerId = managerId ?? null
  }
}

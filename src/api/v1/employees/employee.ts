export class Employee {
  name: string
  id: number
  managerId?: number | null

  constructor(name: string, id: number, managerId?: number) {
    this.name = name
    this.id = id
    this.managerId = managerId ?? null
  }
}

export class Employee {
  readonly managerId?: number | null

  constructor(readonly name: string, readonly id: number, managerId?: number) {
    this.name = name
    this.id = id
    this.managerId = managerId ?? null
  }
}

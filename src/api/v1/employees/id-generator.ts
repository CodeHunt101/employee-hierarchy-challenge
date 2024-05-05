export class IdGenerator {
  private availableIds: Set<number>

  constructor(maxId: number) {
    this.availableIds = new Set(Array.from({ length: maxId }, (_, i) => i + 1))
  }

  generateUniqueId(manualId?: number): number {
    if (manualId !== undefined) {
      this.checkIdValidity(manualId)
      this.checkIdAvailability(manualId)
      this.availableIds.delete(manualId)
      return manualId
    } else {
      if (this.availableIds.size === 0) {
        throw new Error('No available IDs')
      }
      const availableIterator = this.availableIds.values()
      const nextId = availableIterator.next().value
      this.availableIds.delete(nextId)
      return nextId
    }
  }

  checkIdValidity(manualId: number, isManagerId?: boolean) {
    if (manualId < 1 || !Number.isInteger(manualId)) {
      throw new Error(
        `${
          isManagerId ? 'Manager ID' : 'ID'
        } provided: ${manualId}, must be a positive integer`
      )
    }
  }

  private checkIdAvailability(manualId: number) {
    if (!this.availableIds.has(manualId)) {
      throw new Error(`ID ${manualId} is not available`)
    }
  }
}

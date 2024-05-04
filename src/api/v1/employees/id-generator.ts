export class IdGenerator {
  private availableIds: Set<number>;

  constructor(maxId: number) {
    this.availableIds = new Set(Array.from({ length: maxId }, (_, i) => i + 1));
  }

  generateUniqueId(): number {
    if (this.availableIds.size === 0) {
      throw Error('No available IDs')
    }
    const availableIterator = this.availableIds.values();
    const nextId = availableIterator.next().value;
    this.availableIds.delete(nextId);
    return nextId;
  }
}
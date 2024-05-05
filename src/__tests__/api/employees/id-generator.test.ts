import { IdGenerator } from '../../../api/v1/employees/id-generator'

describe('IdGenerator class', () => {
  it('returns unique IDs', () => {
    const idGenerator = new IdGenerator(5)
    const generatedIds = new Set<number>()

    for (let i = 0; i < 5; i++) {
      const id = idGenerator.generateUniqueId()
      expect(generatedIds.has(id)).toBe(false)
      generatedIds.add(id)
    }
  })

  it('returns unique IDs based in manual entries', () => {
    const idGenerator = new IdGenerator(5)
    const generatedIds = new Set<number>()

    for (let i = 1; i <= 5; i++) {
      const id = idGenerator.generateUniqueId(i)
      expect(generatedIds.has(id)).toBe(false)
      generatedIds.add(id)
    }
  })

  it('throws error when maxId reached', () => {
    const idGenerator = new IdGenerator(3)
    for (let i = 0; i < 3; i++) {
      idGenerator.generateUniqueId() // Consume all available IDs
    }
    expect(() => idGenerator.generateUniqueId()).toThrow('No available IDs')
  })

  it('throws error when provided ID is less than 1', () => {
    const idGenerator = new IdGenerator(1)
    expect(() => idGenerator.generateUniqueId(0)).toThrow(
      'ID provided must be a positive integer'
    )
  })

  it('throws error when provided ID is not an integer', () => {
    const idGenerator = new IdGenerator(1)
    expect(() => idGenerator.generateUniqueId(1.1)).toThrow(
      'ID provided must be a positive integer'
    )
  })

  it('throws error when a manually passed ID is already taken', () => {
    const idGenerator = new IdGenerator(2)
    idGenerator.generateUniqueId() //Assigns an ID of 1
    const manualId = 1
    expect(() => idGenerator.generateUniqueId(manualId)).toThrow(
      `ID ${manualId} is not available`
    )
  })
})

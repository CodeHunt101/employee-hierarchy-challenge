import { IdGenerator } from "../../../api/v1/employees/id-generator";

describe('IdGenerator class', () => {
  it('generateUniqueId returns unique IDs', () => {
    const idGenerator = new IdGenerator(5);
    const generatedIds = new Set<number>();

    for (let i = 0; i < 5; i++) {
      const id = idGenerator.generateUniqueId();
      expect(generatedIds.has(id)).toBe(false);
      generatedIds.add(id);
    }
  });

  it('generateUniqueId throws error when maxId reached', () => {
    const idGenerator = new IdGenerator(3);
    for (let i = 0; i < 3; i++) {
      idGenerator.generateUniqueId(); // Consume all available IDs
    }
    expect(() => idGenerator.generateUniqueId()).toThrow('No available IDs');
  });
});
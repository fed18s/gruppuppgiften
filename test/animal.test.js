import Animal from '../class/animal';

// Define mocks
function mockCollection() {
  return {
    all() {
      return [];
    },
    find() {
      return { id: 0, name: 'test' };
    },
    push() {
      return 1;
    },
  };
}

describe('testing animal class', () => {
  let animal = null;
  beforeEach(() => {
    animal = new Animal('test', mockCollection());
  });

  test('animal of expected class', () => {
    expect(animal).toBeInstanceOf(Animal);
  });

  test('animal of expected type', () => {
    expect(animal.getType()).toBe('test');
  });

  test('animal.all() return type', () => {
    expect(animal.getAll()).toBeInstanceOf(Array);
  });

  test('animal.getById() return type', () => {
    expect(animal.getById(0)).toBeInstanceOf(Object);
  });

  test('animal.add() return value', () => {
    expect(animal.add('test')).toBe(1);
  });
});

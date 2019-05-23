import Animal from '../../class/animal';
import mockCollection from '../mocks/mockCollection';

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

  test('animal.find() actually finding stuff', () => {
    expect(animal.find('name', 'test')).toBeInstanceOf(Object);
  });

  test('animal.find() failing to find non-present stuff', () => {
    expect(animal.find('name', 'test2')).toBe(-1);
  });
});

const mockAnimal = (type) => {
  const item = { id: 0, name: 'test' };
  const animal = {};
  animal.getType = jest.fn().mockReturnValue(type);
  animal.getAll = jest.fn().mockReturnValue([item]);
  animal.getById = jest.fn().mockReturnValue(item);
  animal.find = jest.fn().mockReturnValue(item);
  animal.add = jest.fn().mockReturnValue(1);
  return animal;
};

export default mockAnimal;

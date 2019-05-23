import AnimalRoutes from '../class/animalRoutes';

// Define mocks
const mockAnimal = (type) => {
  const item = { id: 0, name: 'test'};
  const animal = {};
  animal.getType = jest.fn().mockReturnValue(type);
  animal.getAll = jest.fn().mockReturnValue([item]);
  animal.getById = jest.fn().mockReturnValue(item);
  animal.find = jest.fn().mockReturnValue(item);
  animal.add = jest.fn().mockReturnValue(1);
  return animal;
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockApp = () => {
  const app = {};
  app.get = jest.fn();
  app.post = jest.fn();
  return app;
};

// Actual test suite
describe('testing animal routing class', () => {
  const app = mockApp();
  const animal = mockAnimal('test');
  const animalRoutes = new AnimalRoutes(animal, app);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('route to register get route', () => {
    animalRoutes.registerGetAll();
    expect(app.get).toHaveBeenCalledTimes(1);
  });

  test('route to register post route', () => {
    animalRoutes.registerPostAnimal();
    expect(app.post).toHaveBeenCalledTimes(1);
  });

  test('route animals', () => {
    const req = {};
    const res = mockResponse();
    animalRoutes.runGetAll(req, res);
    expect(animal.getAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('route animal/id', () => {
    const req = { params: { id: 0 } };
    const res = mockResponse();
    animalRoutes.runGetById(req, res);
    expect(animal.getById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('route animalSearch/key/value', () => {
    const req = { params: { key: 'name', value: 'test' } };
    const res = mockResponse();
    animalRoutes.runSearch(req, res);
    expect(animal.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('route post animal', () => {
    const req = { body: { name: 'test' } };
    const res = mockResponse();
    animalRoutes.runAddAnimal(req, res);
    expect(animal.add).toHaveBeenCalledTimes(1);
    expect(animal.add.mock.calls[0][0].name).toBe('test');
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});

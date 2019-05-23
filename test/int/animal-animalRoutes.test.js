import Animal from '../../class/animal';
import AnimalRoutes from '../../class/animalRoutes';
import mockApp from '../mocks/mockApp';
import mockResponse from '../mocks/mockResponse';
import mockCollection from '../mocks/mockCollection';

describe('integration test for AnimalRoutes and Animal', () => {
  const collection = mockCollection();
  const animal = new Animal('test', collection);
  const animalRoutes = new AnimalRoutes(animal, mockApp());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('search to call collection.find', () => {
    const req = { params: { name: 'test' } };
    const res = mockResponse();
    animalRoutes.runSearch(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0].data.id).toBe(0);
    expect(collection.find).toHaveBeenCalledTimes(1);
  });

  test('post to result in item being added to collection', () => {
    const req = { body: { name: 'test' } };
    const res = mockResponse();
    animalRoutes.runAddAnimal(req, res);
    expect(collection.push).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0].id).toBe(1);
  });
});

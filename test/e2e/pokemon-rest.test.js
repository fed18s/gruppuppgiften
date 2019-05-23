import request from 'supertest';
import app from '../../app';

describe('e2e route tests for pokemon', () => {
  const server = request(app);
  test('Get pokemon listing', (done) => {
    server.get('/pokemons')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });

  test('Get pokemon by id', (done) => {
    server.get('/pokemon/1')
      .then((response) => {
        expect(typeof response.body.data.name).toBe('string');
        done();
      });
  });

  test('Post pokemon', (done) => {
    server.post('/pokemon')
      .send({ name: 'Test' })
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeGreaterThan(0);
        done();
      });
  });
});

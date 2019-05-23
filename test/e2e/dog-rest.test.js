import request from 'supertest';
import app from '../../app';

describe('e2e route tests for dogs', () => {
  const server = request(app);
  test('Get dog listing', (done) => {
    server.get('/dogs')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });

  test('Get dog by id', (done) => {
    server.get('/dog/1')
      .then((response) => {
        expect(typeof response.body.data.name).toBe('string');
        done();
      });
  });

  test('Post dog', (done) => {
    server.post('/dog')
      .send({ name: 'Test' })
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeGreaterThan(0);
        done();
      });
  });
});

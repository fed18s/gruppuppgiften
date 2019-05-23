import request from 'supertest';
import app from '../../app';

describe('e2e route tests for cats', () => {
  const server = request(app);
  test('Get cat listing', (done) => {
    server.get('/cats')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });

  test('Get cat by id', (done) => {
    server.get('/cat/1')
      .then((response) => {
        expect(typeof response.body.data.name).toBe('string');
        done();
      });
  });

  test('Post cat', (done) => {
    server.post('/cat')
      .send({ name: 'Test' })
      .set('Content-Type', 'application/json')
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeGreaterThan(0);
        done();
      });
  });
});

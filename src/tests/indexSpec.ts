import supertest from 'supertest';
import express from 'express';
import app from '../index';
import fileSharper from '../utilities/fileSharper';

const request = supertest(app);

describe('Test fileSharper', () => {
  const app = express();
  app.get('/api/images', fileSharper);

  it('should return 500 Internal Server Error for missing image', (done) => {
    supertest(app)
      .get('/api/images?filename=nonexistent&width=300&height=300')
      .expect(500)
      .end((err, res) => {
        if (err) {
          done.fail(err);
        } else {
          expect(res.text).toBe('Internal Server Error');
          done();
        }
      });
  });

  it('returns internal server error if file processing fails', async () => {
    const response = await request.get(
      '/api/images?filename=invalid&width=400&height=300',
    );
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
  });
});

describe('Test endpoint responses', () => {
  it('gets the index endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('gets the images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});

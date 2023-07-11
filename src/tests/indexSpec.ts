import supertest from 'supertest';
import express from 'express';
import app from '../index';
import fileSharper from '../utilities/fileSharper';

const request = supertest(app);

describe('Test fileSharper', () => {
  const app = express();
  app.get('/api/images', fileSharper);

  it('does not throw error on valid image processing', async () => {
    const filename = 'valid';
    const width = 200;
    const height = 200;
    const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    expect(response.status).toBe(200);
  });


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
  // Endpoint index
  it('gets the index endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  // Endpoint api
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  // Endpoint images
  it('gets the images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});

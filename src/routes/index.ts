import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req : express.Request, res: express.Response): void => {
  res.status(200).send('main api is working with status 200 = OK');
});

routes.use('/images', images);

export default routes;

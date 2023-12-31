import express from 'express';
import fileSharper from '../../utilities/fileSharper';

const images = express.Router();

images.get('/', fileSharper, (req: express.Request, res: express.Response): void => {
  res.status(200).send('images route is working with status 200 = OK');
});

export default images;

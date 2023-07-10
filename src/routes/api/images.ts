import express from 'express';


import fileSharper from '../../utilities/fileSharper';

const images = express.Router();

images.get('/', fileSharper,(req, res) => {
    res.send('images routes');
    
});

export default images;
import express from 'express';
import path from 'path';
import sharp from 'sharp';

const fileSharper = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { filename, width, height } = req.query;
  const inputPath = path.join(__dirname, `../images/full/${filename}.jpg`);
  const outputPath = path.join(__dirname, `../images/thumb/${filename}.jpg`);

  if (filename === undefined || width === undefined || height === undefined) {
    res.status(400).send('Invalid data name, width or height, please use this format: http://localhost:3000/api/images?filename=fjord&width=300&height=300');
    
  }else{
    sharp(inputPath)
    .resize(Number(width), Number(height))
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
        res.sendFile(outputPath);
      }
    });
  }

}

export default fileSharper;
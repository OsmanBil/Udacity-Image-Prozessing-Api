import express from 'express';
import path from 'path';
import sharp from 'sharp';

const fileSharper = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { filename, width, height } = req.query;
    const inputPath = path.join(__dirname, `../../images/full/${filename}.jpg`);
    const outputPath = path.join(__dirname, `../../images/thumb/${filename}.jpg`);
  
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




export default fileSharper;
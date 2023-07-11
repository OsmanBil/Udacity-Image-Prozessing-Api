import express from 'express';
import path from 'path';
import sharp from 'sharp';
import cache from 'memory-cache';

export const transform = async (inputPath: string, width: number, height: number, outputPath: string) => {
  return sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath);
}


const fileSharper = async (req: express.Request, res: express.Response) => {
  const { filename, width, height } = req.query;


  const inputPath = path.join(__dirname, `../images/full/${filename}.jpg`);
  const outputPath = path.join(__dirname, `../images/thumb/${filename}_${width}px_${height}px.jpg`,
  );

  if (!filename || !width || !height || typeof filename !== 'string' || isNaN(Number(width)) || isNaN(Number(height)) || Number(width) <= 0 || Number(height) <= 0) {
    res
      .status(400)
      .send(
        'Invalid data: name, width or height, please use this format: http://localhost:3000/api/images?filename=fjord&width=300&height=300',
      );
  } else {
    const cacheKey = `${filename}_${width}_${height}`;
    const cachedPath = cache.get(cacheKey);
    if (cachedPath) {
      // The image was found in the cache, so we can deliver it directly
      res.sendFile(cachedPath);
    } else {
      try {
        // The image was not found in the cache, so we need to resize it and cache it
        await sharp(inputPath)
          .resize(Number(width), Number(height))
          .toFile(outputPath);
        console.log('Image resized successfully');
        // Cache the image
        cache.put(cacheKey, outputPath, 3600000); // Cache time: 1 hour
        res.sendFile(outputPath);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
  }
};

export default fileSharper;

import express from 'express';
import path from 'path';
import sharp from 'sharp';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('server is working');
});



app.get('/don', (req, res) => {
  const { filename, width, height } = req.query;
  const inputPath = path.join(__dirname, 'images/input.jpg');
  const outputPath = `${__dirname}/images/output.jpg`;

  sharp(inputPath)
  .resize(Number(width), Number(height))
  .toFile('src/images/output.jpg', (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
      res.sendFile(outputPath);
    }
  });
});


app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

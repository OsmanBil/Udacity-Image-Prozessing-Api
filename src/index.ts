import express from 'express';
import routes from './routes/index';

const app = express();
const port: number = 3000;

app.get('/', (req : express.Request, res: express.Response): void => {
  res.status(200).send('server is working with status 200 = OK');
});

app.use('/api', routes);

app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});

export default app;

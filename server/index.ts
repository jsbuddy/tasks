import next from 'next';
import express from 'express';
import cors from 'cors';
import api from './api';
import './config/env';
import './config/database';
import debug from './config/debug';

const port = parseInt(process.env.PORT || '3001', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors())

  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());

  server.use('/api', api);

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    debug.log(`> Ready on http://localhost:${port}`);
  });
});

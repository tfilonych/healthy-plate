import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './server/routes';
import renderClient from './render/renderClient';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticFiles = path.resolve(__dirname + '/client/build/static');
const publicFiles = path.resolve(__dirname + '/client/public/*');
const app = express();
const port = 3009;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);
// app.use('/t', require('./routes/redirect.route'))
app.use('/client/build/static', express.static(staticFiles));
app.use('/public', express.static(publicFiles));
app.use('/imageStore', express.static('./imageStore')); // will be removed
app.use('/images/', express.static(path.resolve(__dirname + '/client/build/images')));

app.get('*', (req, res) => renderClient(req, res));

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
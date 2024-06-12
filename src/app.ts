import 'reflect-metadata';
import express, { Express } from 'express';
import { logSuccess } from './utils/helpers';
import loaders from './loaders';

const app: Express = express();
loaders(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
	logSuccess(`⚡️[server]: Server is running at http://localhost:${port}`)
});

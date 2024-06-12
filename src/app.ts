import 'reflect-metadata';

import express, { Express, Request, Response } from 'express';
import { dataSource } from './config/database';
import { User } from './modules/userAccounts/entity/user.entity';

// establish database connection
dataSource
	.initialize()
	.then(() => {
		console.log('Database connected successfully!');

		// create and setup express app
		const app: Express = express();
		app.use(express.json());

		// register routes
		app.get('/users', async function (req: Request, res: Response) {
			// here we will have logic to return all users
			const users = await dataSource.getRepository(User).find();
			res.json(users);
		});

		const port = process.env.PORT || 3000;

		// start express server
		app.listen(port, () => {
			console.log(
				`⚡️[server]: Server is running at http://localhost:${port}`
			);
		});
	})
	.catch((err) => {
		console.error('Error during Database Connection:', err);
	});

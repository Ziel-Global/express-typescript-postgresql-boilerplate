import { DataSource } from 'typeorm';
import { DB_NAME, DB_PASS, DB_USER } from './constants';

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	entities: ['src/**/*.entity.ts'],
	logging: true,
	synchronize: true,
});

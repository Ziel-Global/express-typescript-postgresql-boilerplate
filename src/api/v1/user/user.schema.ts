import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { dataSource } from '../../../config/database';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	firstName: string;

	@Column('varchar')
	lastName: string;

	constructor() {
		this.id = 0;
		this.firstName = '';
		this.lastName = '';
	}
}

export const userModel = dataSource.getRepository(User)
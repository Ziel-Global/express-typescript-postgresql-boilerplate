import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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

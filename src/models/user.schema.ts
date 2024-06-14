import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { dataSource } from '../config/database';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column('varchar', { nullable: true })
    @Index({ unique: true, where: "email IS NOT NULL" })
    email: string | null;

    @Column('varchar')
    password: string;

    @Column('boolean', { default: false })
    superAdmin: boolean;

    @Column('varchar')
    firstName: string;

    @Column({ nullable: true, type: 'varchar' })
    lastName: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = null;
        this.password = '';
        this.superAdmin = false;
        this.createdAt = new Date();
        this.updatedDate = new Date();
    }
}

export const userModel = dataSource.getRepository(User)
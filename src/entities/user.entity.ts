import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, BaseEntity } from 'typeorm';
import { dataSource } from '../config/database';

@Entity('users')
export class User  {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @Column('varchar', { nullable: true })
    @Index({ unique: true, where: "email IS NOT NULL" })
    email!: string | null;

    @Column('varchar')
    @Index({ unique: true})
    username!: string | null;

    @Column('varchar')
    password!: string;

    @Column('boolean', { default: false })
    superAdmin!: boolean;

    @Column('varchar')
    firstName!: string;

    @Column({ nullable: true, type: 'varchar' })
    lastName!: string | null;
}


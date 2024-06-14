import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { dataSource } from "../config/database";

@Entity('organizations')
export class Organization  {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('float')
    latitude!: number;

    @Column('float')
    longitude!: number;

    @Column('float')
    radius!: number;

    @Column('varchar')
    name!: string;

    @Column('varchar')
    address!: string;

    @Column('varchar')
    status!: 'accepted' | 'rejected' | 'pending';

    @Column('varchar')
    city!: string;

    @Column('varchar')
    country!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    // constructor() {
    //     super()
    //     this.id = 0;
    //     this.latitude = 0;
    //     this.longitude = 0;
    //     this.radius = 0;
    //     this.name = '';
    //     this.address = '';
    //     this.status = 'pending';
    //     this.city = '';
    //     this.country = '';
    //     this.createdAt = new Date();
    //     this.updatedDate = new Date();
    // }
}


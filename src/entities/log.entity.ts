import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('log')
export class Log {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, { nullable: true })
    userId!: User | null;

    @Column('varchar')
    payload!: string;

    @Column('boolean')
    error!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @Column('date')
    dateTime!: Date;

    @Column({type: 'int', nullable: true})
    length!: number | null;
}


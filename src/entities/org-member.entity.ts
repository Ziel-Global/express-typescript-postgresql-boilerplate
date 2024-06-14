import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Organization } from "./organization.entity";

@Entity('organization_members')
export class OrgMember  {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    userId!: User;

    @ManyToOne(() => Organization)
    @JoinColumn({ name: 'organizationId' })
    organization!: Organization;

    @Column('boolean', { default: false })
    isOwner!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    // constructor() {
    //     this.id = 0;
    //     this.userId = new User();
    //     this.organization = new Organization();
    //     this.isOwner = false;
    //     this.createdAt = new Date();
    //     this.updatedDate = new Date();
    // }
}


import { DataSource } from 'typeorm';
import { DB_NAME, DB_PASS, DB_USER } from './constants';
import { User } from '../entities/user.entity';
import { Log } from '../entities/log.entity';
import { Organization } from '../entities/organization.entity';
import { OrgMember } from '../entities/org-member.entity';

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	entities: [User,Log,Organization, OrgMember],
	logging: true,
	synchronize: true,
});

export const userModel = dataSource.getRepository(User)
export const organizationModel = dataSource.getRepository(Organization);
export const orgMemberModel = dataSource.getRepository(OrgMember);
export const LogModel = dataSource.getRepository(Log);
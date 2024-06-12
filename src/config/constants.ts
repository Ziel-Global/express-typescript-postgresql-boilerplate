import { config } from "dotenv";
config();

export const DB_USER = process.env.POSTGRESQL_USER as string
export const DB_PASS = process.env.POSTGRESQL_PASS as string
export const DB_NAME = process.env.DB_NAME as string
export const JwtSecretKey = process.env.JWT_SECRET_KEY as string | undefined

export const CURRENT_VERSION = 'v1'
export const prefix = `/api/${CURRENT_VERSION}`;
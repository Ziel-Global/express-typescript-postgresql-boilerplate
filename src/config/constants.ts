import { config } from "dotenv";
config();

export const DB_USER = process.env.POSTGRESQL_USER as string
export const DB_PASS = process.env.POSTGRESQL_PASS as string
export const DB_NAME = process.env.DB_NAME as string
export const JwtSecretKey = process.env.JWT_SECRET_KEY as string | undefined

export const CURRENT_VERSION = 'v1'
export const prefix = `/api/${CURRENT_VERSION}`;

export const STATUS_CODES = {
    SUCCESS: {
        CREATED: 201,
        OK: 200
    },
    CLIENT: {
        UNAUTHENTICATED: 401,
        FORBIDDEN: 403,
        ATTENDANCE_DAY_END_LOG: 406,
        REQUEST_TIMEOUT: 408,
        RATE_LIMIT: 429,
        NOT_FOUND: 404
    },
    SERVER: {
        INTERNAL_SERVER_ERROR: 500,
    }
}
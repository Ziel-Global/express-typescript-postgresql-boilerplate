import { dataSource } from "../config/database";
import { logFailure, logSuccess } from "../utils/helpers";

export default async () => {
    try {
        await dataSource.initialize()
        logSuccess('Database connected successfully!')
    } catch(err: any) {
        logFailure(err.message || err as string || 'Error Occured');
        process.exit(1)
    }
};
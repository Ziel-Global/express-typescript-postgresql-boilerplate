import { Request } from "express";

export default (req: Request) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (Array.isArray(forwardedFor)) {
        // If it's an array, return the first element
        return forwardedFor[0];
    } else if (typeof forwardedFor === 'string') {
        // If it's a string, split and return the first element
        return forwardedFor.split(', ')[0];
    } else {
        // If neither, use the remote address
        return req.connection.remoteAddress;
    }
};

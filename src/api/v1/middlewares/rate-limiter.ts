import { Response, Request, NextFunction } from "express";
import { logDebug } from "../../../utils/helpers";

export default (req: Request, res: Response, next: NextFunction) => {
    // RATE LIMITING NOT IMPLEMENTED
    logDebug(req.ip || 'no-ip')
    next();
}
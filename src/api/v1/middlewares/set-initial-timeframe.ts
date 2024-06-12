import { NextFunction, Response, Request } from "express";

export const setInitialTimestamp = (req: Request, res: Response, next: NextFunction) => {
    req.initialTimeStamp = Date.now();
    next();
  };
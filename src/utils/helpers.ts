import chalk from "chalk";
import getText from "../config/lang/get-text";
import { STATUS_CODES } from "../config/constants";
import { Request, Response } from "express";
import { Log,  } from "../entities/log.entity";
import { LogModel, userModel } from "../config/database";


export const buildTime = (initialTimeStamp: number): number => {
    const currentTime = Date.now();
    return currentTime - initialTimeStamp;
  };

export function logSuccess(msg: string): void {
    console.log(chalk.bgHex('#006400').white(msg));
}

export function logFailure(msg: string): void {
    console.error(chalk.bgHex('#FF0000').white(`❌[server]: An error occurred: ${msg}`));
}

export function logDebug(msg: string): void {
    console.error(chalk.bgHex('#FF0000').white(`🐛[DEBUG]: ${msg}`));
}

export type UnifiedResponseType<T = any> = {
    payload?: T;
    message: string;
    error: boolean;
    statusCode: number;
    dateTime: Date;
    length?: number;
    timeTakenForAPI: number;
};

export type Logtype<T = any>= Omit<UnifiedResponseType<T>,'timeTakenForAPI'>

export const log = async <M = any>(dataObj: Logtype<M>, userId?: string): Promise<void> => {
    console.group('End point complete!')
    console.log("End Time: ", new Date().toISOString())
    console.log({ dataObj })
    console.groupEnd();
    const user = userId ? await userModel.findOneBy({ id: userId }) : null;

    const payloadToSend = JSON.stringify(dataObj.payload);

    const payloadForDb: Omit<Log, 'id' | 'createdAt' | 'updatedDate'> = {
        userId: user || null,
        payload: payloadToSend ? payloadToSend : '',
        error: dataObj.error,
        dateTime: dataObj.dateTime,
        length: dataObj.length ? dataObj.length : null,
    }

    const logEntry = LogModel.create(payloadForDb);

    await LogModel.save(logEntry);
}

  export const success = async  <T>(req: Request, res: Response, responseCode: string = "00005", payload?: T | undefined, created = false) => {
    
    const txt = getText(responseCode)
    const responseMessage = txt ? txt : getText(responseCode) as string;
    const responseObj: Logtype<T> = {
        payload, 
        message: responseMessage, 
        error: false, 
        statusCode: created ? STATUS_CODES.SUCCESS.CREATED : STATUS_CODES.SUCCESS.OK, 
        dateTime: new Date(),
    }
    if (Array.isArray(payload)) {
        responseObj.length = payload.length
    }
    await log(responseObj, req.userId)

    const { initialTimeStamp } = req;
    const timeTakenForAPI = buildTime(initialTimeStamp ? initialTimeStamp : Date.now());

    return res.status(responseObj.statusCode).json({...responseObj, timeTakenForAPI}).end()
}

export const serverError =  async <T>(req: Request, res: Response,payload: T) => {
    
    const responseMessage = getText("00009") as string;
    const responseObj: Logtype<T> = {
        payload, 
        message: responseMessage, 
        error: true, 
        statusCode: 500, 
        dateTime: new Date(),
    }
    await log(responseObj, req.userId)

    const { initialTimeStamp } = req;
    const timeTakenForAPI = buildTime(initialTimeStamp ? initialTimeStamp : Date.now());

    return res.status(responseObj.statusCode).json({...responseObj, timeTakenForAPI}).end()
}

export const clientError =  async <T>(req: Request, res: Response,responseCode: string, statusCode: number, payload?: T | undefined) => {
   
    const txt = getText(responseCode);
    const responseMessage = txt ? txt : getText("00010") as string;
    const responseObj: Logtype<T> = {
        payload, 
        message: responseMessage, 
        error: true, 
        statusCode: statusCode, 
        dateTime: new Date(),
    }

    await log(responseObj, req.userId)

    const { initialTimeStamp } = req;
    const timeTakenForAPI = buildTime(initialTimeStamp ? initialTimeStamp : Date.now());

    return res.status(responseObj.statusCode).json({...responseObj, timeTakenForAPI}).end()
}
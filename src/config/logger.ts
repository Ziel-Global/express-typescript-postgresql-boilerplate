// import { Log } from '../models/index.js';
import { Request } from "express";
import ipHelper from "../utils/ip-helper.js";
import { LOG_LEVELS } from "../types.js";
import { logFailure, logSuccess } from "../utils/helpers.js";
import getText from "./lang/get-text.js";

type LoggerFn = (code: string, userId?: string, errorMessage?: string, level?: LOG_LEVELS, req?: Request | null) => Promise<void>

const loggerFn: LoggerFn = async (code, userId = '', errorMessage = '', level = 'Info', req = null) => {
    let ip: string | undefined;
    ip = 'no-ip'
    if(req) ip = ipHelper(req);
    let logObj = {
      resultCode: code,
      level: level,
      codeMsg: getText(code),
      errorMessage: errorMessage,
      ip: ip
    }

    if (['Debug', 'Warn', 'Error', 'Fatal'].includes(level)) {
      logFailure(`Error: ${JSON.stringify(logObj)}`)
    }

    else {
      logSuccess(`${JSON.stringify(logObj)}`)
    }
  
  //   if (userId !== '' && userId) log.userId = userId;
  
  //   await log.save()
  //     .catch(err => {
  //       console.log('Logging is failed: ' + err);
  //     });
  }

export default loggerFn;

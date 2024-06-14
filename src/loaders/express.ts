import express, { Express, Request, Response } from 'express';
import loggerFn from '../config/logger';
import { JwtSecretKey, STATUS_CODES, prefix } from '../config/constants';
import getText from '../config/lang/get-text';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimiter from '../api/v1/middlewares/rate-limiter';
import { setInitialTimestamp } from '../api/v1/middlewares/set-initial-timeframe';
import router from '../api/v1/router';
import { clientError, success } from '../utils/helpers';

export default (app: Express) => {
    process.on("uncaughtException", async (error) => {
        // console.log(error);
        loggerFn("00002", "", error.message, "Error");
      });
      process.on("unhandledRejection", async (ex: any) => {
        // console.log(ex);
        loggerFn("00003", "", ex.message || "", "Error");
      });
      if (!JwtSecretKey) {
        const err = getText('00003')

        loggerFn("00003", "", 'Jwtprivatekey is not defined!', "Fatal");
        process.exit(1);
      }
      app.enable("trust proxy");
      app.use(cors());
      app.get("/favicon.ico", (req: Request, res: Response) => res.status(204));
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(morgan("dev"));
      app.use(helmet());
      app.use(compression());
      app.use(express.static("public"));
      app.disable("x-powered-by");
      app.disable("etag");
    // RATE LIMITING NOT IMPLEMENTED
      app.use(rateLimiter);
      app.use(prefix, setInitialTimestamp, router);
      app.get("/", (_req, res) => {
        return success(_req, res, '00007')
      });

      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.header("Content-Security-Policy-Report-Only", "default-src: https:");
        if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
          return res.status(200).json({});
        }
        next();
      });

      app.use((_req: Request, _res: Response) => {
        return clientError(_req, _res, '00008',STATUS_CODES.CLIENT.NOT_FOUND)
      });
  };
  
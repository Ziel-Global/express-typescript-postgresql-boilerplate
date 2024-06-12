import { Express } from 'express';
import postgreSQLLoader from "./postgresql";
import expressLoader from "./express";

export default async (app: Express): Promise<void> => {
  await postgreSQLLoader();
  expressLoader(app);
};

import { Router } from "express";
import userController from "./user.controller";
const userRouter = Router();
const { getAllUsers } = userController
userRouter.get('/', getAllUsers)

export default userRouter;

import { Router } from "express";
import userController from "./user.controller";
const userRouter = Router();
const { getAllUsers, createSuperAdmin } = userController
userRouter.get('/', getAllUsers)
userRouter.post('/super-admin', createSuperAdmin)

export default userRouter;

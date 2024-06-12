import { Request, Response } from "express";

const userController = {
    getAllUsers: (req: Request, res: Response) => {
        return res.send('Getting all users')
    }
}

export default userController
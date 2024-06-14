import { Request, Response } from "express";
import { clientError, serverError, success } from "../../../utils/helpers";
import { validateCreateSuperAdmin } from "./user.validators";
import { STATUS_CODES } from "../../../config/constants";
import userServices from "./user.services";

const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        return res.send('Getting all users')
    },
    createSuperAdmin: async (req: Request, res: Response) => {
        try {
            const {email, password, firstName, lastName, username} = req.body;

            const { error } = validateCreateSuperAdmin({ email, password, firstName, lastName, username });
    
            if (error) {
                return clientError(req, res, '00011', STATUS_CODES.CLIENT.FORBIDDEN, error.details[0].message);
            }

            const createUserRes: string = await userServices.createUser({
                email, password, firstName, lastName, username,
                superAdmin: true
            })

            if (createUserRes === 'user-exists') {
                return clientError(req, res, '00012', STATUS_CODES.CLIENT.FORBIDDEN)
            }

            if (createUserRes !== 'ok') {
                throw new Error('Unknown Error')
            }
            
            return success(req, res)
        } catch(err: any) {
            return serverError(req, res, err.message || err || 'Error Occured')
        }
        
    }
}

export default userController
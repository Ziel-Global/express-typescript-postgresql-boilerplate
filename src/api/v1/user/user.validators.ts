import Joi from "joi";
import { CreateSuperAdminDTO } from "./user.types";

const VALIDATORS = {
    EMAIL: Joi.string().email().min(3),
    PASSWORD: Joi.string(),
    NAME: Joi.string(),
    USERNAME: Joi.string().min(3)
}

export const validateCreateSuperAdmin = (body: CreateSuperAdminDTO) => {
    const schema = Joi.object({
        email: VALIDATORS.EMAIL.required(),
        password: VALIDATORS.PASSWORD.required(),
        firstName: VALIDATORS.NAME.required(),
        lastName: VALIDATORS.NAME,
        username: VALIDATORS.USERNAME
      });

      return schema.validate(body);
}
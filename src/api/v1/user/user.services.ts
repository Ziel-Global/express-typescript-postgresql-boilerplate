import { userModel } from "../../../config/database"
import hashServices from "../hash/hash.services"
import { CreateGeneralUserDTO, CreateSuperAdminDTO, SuperAdminCreationPayload } from "./user.types"

const userServices = {
    userWithUsernameExists: async (username: string) => {
        const user = await userModel.findOneBy({
            username
        })
        if (user) {return true}
        else {return false}
    },
    userWithEmailExists: async (email: string) => {
        const user = await userModel.findOneBy({
            email
        })
        if (user) {return true}
        else {return false}
    },
    createUser: async (payload: CreateGeneralUserDTO) => {
        const userAlreadyExists = await userServices.userWithUsernameExists(payload.username);

        if (userAlreadyExists) {
            return 'user-exists'
        }
        const userWithEmailAlreadyExists = await userServices.userWithEmailExists(payload.username);

        if (userWithEmailAlreadyExists) {
            return 'user-exists'
        }

        const hashedPassword = await hashServices.hashPassword(payload.password);

        const adminUserPayload: SuperAdminCreationPayload = {
            superAdmin: payload.superAdmin || false,
            email: payload.email,
            firstName: payload.firstName,
            password: hashedPassword,
            username: payload.username,
            lastName: payload.lastName || null
        }

        const newUserEntry = userModel.create(adminUserPayload);

        await userModel.save(newUserEntry);

        return 'ok';
    }
}

export default userServices
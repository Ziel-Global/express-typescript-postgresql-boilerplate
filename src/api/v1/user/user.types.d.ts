export type CreateSuperAdminDTO = CreateGeneralUserDTO

export type SuperAdminCreationPayload  = CreateGeneralUserDTO & {
    superAdmin: boolean,
}

export type CreateGeneralUserDTO = {
    email: string,
    password: string,
    firstName: string,
    lastName?: string | null,
    username: string,
    superAdmin?: boolean
}
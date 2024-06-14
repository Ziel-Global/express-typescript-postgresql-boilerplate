import bcrypt from 'bcrypt'

const hashServices = {
    hashPassword: async (password: string) => {
        const saltRounds = 10;
        const res = await bcrypt.hash(password, saltRounds)
        return res;
    },
    verifyPassword: async (myPassword: string, basePassword: string) => {
        const isCorrectPassword = await bcrypt.compare(myPassword,basePassword);

        return isCorrectPassword
    }
}

export default hashServices
class AuthService {
    async createUser({ firstname, email }) {
        const createdUser = await prisma.user.create({
            data: {
                firstname,
            }
        })

        return createdUser;
    }
}
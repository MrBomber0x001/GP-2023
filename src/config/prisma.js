import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


const main = async () => {
    const createdUser = await prisma.user.create({
        data: {
            firstname: "yousef",
            lastname: "meska",
            email: "meska@test.com",
            // password: "444444",
        }
    })

    console.log(createdUser);
}

main().then(async () => {
    console.log("got there");
    await prisma.$connect();
}).catch(async () => {
    await prisma.$disconnect();
})

export default prisma;

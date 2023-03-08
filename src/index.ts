import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'cyril.clavere@prisma.io',
            password: 'tempspassword',
            name: 'Cyril',
            lastName: 'Clavere',
            nickname: 'Charles Pasclerc',
            age: 26,
            birthday: new Date('March 11, 1997 17:30:00'),
            lastModification: new Date(),
            lastConnexion: new Date(),
        },
    });

    const allUsers = await prisma.user.findMany();
    console.dir(allUsers, { depth: null });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

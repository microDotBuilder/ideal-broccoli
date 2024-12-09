import { Prisma } from "./index";

const prisma = new Prisma();
async function findUser(email: string) {
  const db = prisma.getClient();
  const user = await db.user.findUnique({
    select: {
      name: true,
      email: true,
    },
    where: {
      email,
    },
  });
  console.log(user);
  return user;
}

findUser("alice1733686821887@prisma.io")
  .then((user) => console.log(user))
  .catch((error) => console.error(error))
  .finally(() => prisma.break());

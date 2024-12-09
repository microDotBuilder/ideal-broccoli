import { Prisma } from "../index";
import { cleanDb } from "./empty-db";
import { seedQueries } from "./queries";

const prisma = new Prisma();
const db = prisma.getClient();

export async function seedDB() {
  await cleanDb(db);
  await seedQueries(db);
}

seedDB()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.break();
  });

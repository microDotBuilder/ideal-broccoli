import { PrismaClient } from "@prisma/client";

export async function cleanDb(db: PrismaClient) {
  console.time("🧹 Cleaned up the database...");
  await db.user.deleteMany();
  await db.avatar.deleteMany();
  console.timeEnd("🧹 Cleaned up the database...");
}

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export class Prisma {
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
    this.client.$extends(withAccelerate());
  }
  getClient() {
    return this.client;
  }
  break() {
    this.client.$disconnect();
  }
}

// import { Prisma } from "../index";

import { PrismaClient, UserRole } from "@prisma/client";
import {
  generateRandomUser,
  generateRandomAvatar,
  getAdminUser,
  getAdminAvatar,
} from "../db-utils";

// const prisma = new Prisma();
// const db = prisma.getClient();

// async function main() {
//   const user1Email = `alice${Date.now()}@prisma.io`;
//   const user2Email = `bob${Date.now()}@prisma.io`;

//   console.log("🌱 Seeding...");
//   console.time(`🌱 Database has been seeded`);

//   // clean the database

//   // Seed the database with users and posts
//   const user1 = await db.user.create({
//     data: {
//       email: user1Email,
//       name: "Alice",
//       posts: {
//         create: {
//           title: "Join the Prisma community on Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//       },
//     },
//     include: {
//       posts: true,
//     },
//   });
//   const user2 = await db.user.create({
//     data: {
//       email: user2Email,
//       name: "Bob",
//       posts: {
//         create: [
//           {
//             title: "Check out Prisma on YouTube",
//             content: "https://pris.ly/youtube",
//             published: true,
//           },
//           {
//             title: "Follow Prisma on Twitter",
//             content: "https://twitter.com/prisma/",
//             published: false,
//           },
//         ],
//       },
//     },
//     include: {
//       posts: true,
//     },
//   });
//   console.log(
//     `Created users: ${user1.name} (${user1.posts.length} post) and ${user2.name} (${user2.posts.length} posts) `
//   );

//   // Retrieve all published posts
//   const allPosts = await db.post.findMany({
//     where: { published: true },
//   });
//   console.log(`Retrieved all published posts: ${JSON.stringify(allPosts)}`);

//   // Create a new post (written by an already existing user with email alice@prisma.io)
//   const newPost = await db.post.create({
//     data: {
//       title: "Join the Prisma Discord community",
//       content: "https://pris.ly/discord",
//       published: false,
//       author: {
//         connect: {
//           email: user1Email,
//         },
//       },
//     },
//   });
//   console.log(`Created a new post: ${JSON.stringify(newPost)}`);

//   // Publish the new post
//   const updatedPost = await db.post.update({
//     where: {
//       id: newPost.id,
//     },
//     data: {
//       published: true,
//     },
//   });
//   console.log(
//     `Published the newly created post: ${JSON.stringify(updatedPost)}`
//   );

//   // Retrieve all posts by user with email alice@prisma.io
//   const postsByUser = await db.post.findMany({
//     where: {
//       author: {
//         email: user1Email,
//       },
//     },
//   });
//   console.log(
//     `Retrieved all posts from a specific user: ${JSON.stringify(postsByUser)}`
//   );
// }

export async function seedQueries(db: PrismaClient) {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);
  const totalUsers = 3;
  console.time(`👤 Created ${totalUsers} users...`);
  // TODO: this is where the users are created
  for (let i = 0; i < totalUsers; i++) {
    const user = generateRandomUser();
    const avatar = generateRandomAvatar();
    await db.user.create({
      data: {
        ...user,
        role: UserRole.USER,
        avatar: {
          create: avatar,
        },
      },
    });
  }
  console.timeEnd(`👤 Created ${totalUsers} users...`);

  console.time(`🐨 Created admin user "kody"`);
  const adminUser = getAdminUser();
  const adminUri = getAdminAvatar();
  await db.user.create({
    data: {
      ...adminUser,
      role: UserRole.ADMIN,
      avatar: {
        create: adminUri,
      },
    },
  });
  console.timeEnd(`🐨 Created admin user "kody"`);

  console.timeEnd(`🌱 Database has been seeded`);
}

import { Prisma } from "../index";

const prisma = new Prisma();
const db = prisma.getClient();

async function main() {
  const user1Email = `alice${Date.now()}@prisma.io`;
  const user2Email = `bob${Date.now()}@prisma.io`;

  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  console.time("🧹 Cleaned up the database...");
  await db.user.deleteMany();
  await db.post.deleteMany();
  console.timeEnd("🧹 Cleaned up the database...");
  // Seed the database with users and posts
  const user1 = await db.user.create({
    data: {
      email: user1Email,
      name: "Alice",
      posts: {
        create: {
          title: "Join the Prisma community on Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  const user2 = await db.user.create({
    data: {
      email: user2Email,
      name: "Bob",
      posts: {
        create: [
          {
            title: "Check out Prisma on YouTube",
            content: "https://pris.ly/youtube",
            published: true,
          },
          {
            title: "Follow Prisma on Twitter",
            content: "https://twitter.com/prisma/",
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });
  console.log(
    `Created users: ${user1.name} (${user1.posts.length} post) and ${user2.name} (${user2.posts.length} posts) `
  );

  // Retrieve all published posts
  const allPosts = await db.post.findMany({
    where: { published: true },
  });
  console.log(`Retrieved all published posts: ${JSON.stringify(allPosts)}`);

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await db.post.create({
    data: {
      title: "Join the Prisma Discord community",
      content: "https://pris.ly/discord",
      published: false,
      author: {
        connect: {
          email: user1Email,
        },
      },
    },
  });
  console.log(`Created a new post: ${JSON.stringify(newPost)}`);

  // Publish the new post
  const updatedPost = await db.post.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  });
  console.log(
    `Published the newly created post: ${JSON.stringify(updatedPost)}`
  );

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await db.post.findMany({
    where: {
      author: {
        email: user1Email,
      },
    },
  });
  console.log(
    `Retrieved all posts from a specific user: ${JSON.stringify(postsByUser)}`
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => prisma.break());

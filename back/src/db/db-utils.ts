import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { UniqueEnforcer } from "enforce-unique";

const uniqueUsernameEnforcer = new UniqueEnforcer();

export function generateRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = uniqueUsernameEnforcer
    .enforce(() => {
      return (
        faker.string.alphanumeric({ length: 2 }) +
        "_" +
        faker.internet.username({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        })
      );
    })
    .slice(0, 20)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");

  return {
    username,
    name: `${firstName} ${lastName}`,
    email: `${username}${Date.now()}@prisma.io`,
  };
}

export function generateRandomAvatar() {
  return {
    url: faker.image.avatar(),
    altText: faker.lorem.sentence({
      min: faker.number.int(3),
      max: faker.number.int(10),
    }),
    contentType: "image/jpeg",
  };
}

export function getAdminUser() {
  return {
    username: "kody",
    name: "Kody",
    email: "kody@prisma.io",
  };
}

export function getAdminAvatar() {
  return {
    url: "https://images.pexels.com/photos/3066867/pexels-photo-3066867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    altText: "Kody's avatar",
    contentType: "image/jpeg",
  };
}

export function getUniqueClerkUserId() {
  return uniqueUsernameEnforcer.enforce(() => {
    return faker.string.alphanumeric({ length: 20 });
  });
}

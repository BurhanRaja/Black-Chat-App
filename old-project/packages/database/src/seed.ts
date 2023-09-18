import { prisma } from "./client";
import type { User } from ".prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    username: "Tim Apple",
    email: "tim@apple.com",
    password: "Hello",
    country: "India",
    phone: "+911234567890",
    uniqueId: "AnyId",
  },
] as Array<User>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

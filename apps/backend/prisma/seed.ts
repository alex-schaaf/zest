import { hash } from "../src/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      email: "email@example.com",
      passwordHash: hash("admin"),
      settings: {
        create: {
          stravaClientId: process.env.STRAVA_CLIENT_ID
            ? parseInt(process.env.STRAVA_CLIENT_ID)
            : undefined,
          stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
        },
      },
    },
  });
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

import { hash } from "../src/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      username: "admin",
      passwordHash: hash("admin"),
      settings: {
        create: {
          stravaClientId: process.env.STRAVA_CLIENT_ID,
          stravaClientSecretHash:
            process.env.STRAVA_CLIENT_SECRET &&
            hash(process.env.STRAVA_CLIENT_SECRET),
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

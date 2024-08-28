import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../src/auth/auth.service"

const prisma = new PrismaClient()
async function main() {
  console.log("🌱 Seeding database...")
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: await hashPassword("admin"),
      settings: {},
    },
  })
  console.log(`✨ Created user: ${user.email}`)
  console.log("🌱 Database seeding complete.")
}

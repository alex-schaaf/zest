import { Users } from "@prisma/client"
import settings from "./settings"

const user: Omit<Users, "passwordHash"> = {
  id: 1,
  email: "email@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  settingsId: settings.id,
}

export default user

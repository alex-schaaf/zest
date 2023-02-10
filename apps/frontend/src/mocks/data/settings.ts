import { Settings } from "@prisma/client"

const settings: Settings = {
  id: 1,
  updatedAt: new Date(),
  stravaClientId: null,
  stravaClientSecret: null,
  stravaAccessToken: null,
  stravaRefreshToken: null,
  stravaTokenExpiresAt: null,
}

export default settings

export interface User {
  id: number
  email: string

  createdAt: string
  updatedAt: string

  settingsId: number
}

export type UserWithSettings = User & { settings: Settings }

export interface Settings {
  id: number
  updatedAt: string

  stravaClientId?: string
  stravaClientSecret?: string
  stravaRefreshToken?: string
  stravaAccessToken?: string
  stravaTokenExpiresAt?: number
}

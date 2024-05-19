import { ApiProperty } from "@nestjs/swagger"
import { Prisma, Settings, Users } from "@prisma/client"

export type UsersWithSettings = Users &
  Prisma.UsersGetPayload<{
    select: { settings: true }
  }>

/*
Settings DTOs
*/

export class SettingsDto implements Settings {
  @ApiProperty()
  id: number
  @ApiProperty()
  updatedAt: Date
  @ApiProperty()
  stravaClientId: string | null
  @ApiProperty()
  stravaClientSecret: string | null
  @ApiProperty()
  stravaAccessToken: string | null
  @ApiProperty()
  stravaRefreshToken: string | null
  @ApiProperty()
  stravaTokenExpiresAt: number | null
}

export class SettingsCreateDto {}

export class SettingsPatchDto
  implements Partial<Omit<Settings, "id" | "updatedAt">>
{
  @ApiProperty()
  stravaClientId?: string
  @ApiProperty()
  stravaClientSecret?: string
  @ApiProperty()
  stravaAccessToken?: string
  @ApiProperty()
  stravaRefreshToken?: string
  @ApiProperty()
  stravaTokenExpiresAt?: number
}

/* 
User DTOs
*/
type UserCreateDtoType = Pick<Users, "email"> & { password: string }
export class UserCreateDto implements UserCreateDtoType {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

type PatchUserDtoType = Partial<
  Omit<UserDto, "id" | "passwordHash" | "settings">
> &
  SettingsPatchDto
export class UserPatchDto implements PatchUserDtoType {
  @ApiProperty()
  email?: string

  @ApiProperty()
  settings?: SettingsPatchDto
}

export class UserDto implements Omit<UsersWithSettings, "passwordHash"> {
  @ApiProperty()
  id: number
  @ApiProperty()
  email: string
  @ApiProperty()
  createdAt: Date
  @ApiProperty()
  updatedAt: Date
  @ApiProperty()
  settingsId: number
  @ApiProperty()
  settings: SettingsDto
}

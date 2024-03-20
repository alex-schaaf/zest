import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserPatchDto {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;
}

export class UserDto implements Omit<Users, 'passwordHash'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  settingsId: number;
}

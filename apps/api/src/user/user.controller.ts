import { Controller, Get, Logger, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserPatchDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Get('/:id')
  @ApiResponse({ status: 200, type: UserDto })
  async getUserById(
    @Param('id') id: string,
  ): Promise<SafeUserWithoutPasswordHash | null> {
    const user = await this.userService.findOne({ id: Number(id) });
    return excludePasswordHash(user);
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, type: UserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() body: UserPatchDto,
  ): Promise<SafeUserWithoutPasswordHash | null> {
    const user = await this.userService.updateOne({
      where: { id: Number(id) },
      data: body,
    });
    return excludePasswordHash(user);
  }
}

type SafeUserWithoutPasswordHash = Omit<Users, 'passwordHash'>;

function excludePasswordHash(
  user: Users | null,
): SafeUserWithoutPasswordHash | null {
  if (user === null) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...userWithoutPasswordHash } = user;
  return userWithoutPasswordHash;
}

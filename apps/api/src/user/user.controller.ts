import { Controller, Get, Param, Patch, Body } from "@nestjs/common"
import { UserService } from "./user.service"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserDto, UserPatchDto, UsersWithSettings } from "./user.dto"

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:id")
  @ApiResponse({ status: 200, type: UserDto })
  async getUserById(@Param("id") id: string): Promise<UserDto | null> {
    const user = await this.userService.findOne({ id: Number(id) })
    return excludePasswordHash(user)
  }

  @Patch("/:id")
  @ApiResponse({ status: 200, type: UserDto })
  async updateUser(
    @Param("id") id: string,
    @Body() body: UserPatchDto
  ): Promise<UserDto | null> {
    const user = await this.userService.updateOne({
      where: { id: Number(id) },
      data: body,
    })
    return excludePasswordHash(user)
  }
}

function excludePasswordHash(user: UsersWithSettings | null): UserDto | null {
  if (user === null) return null
  const { passwordHash, ...userWithoutPasswordHash } = user
  return userWithoutPasswordHash
}

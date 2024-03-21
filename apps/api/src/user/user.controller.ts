import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UnauthorizedException,
  ParseIntPipe,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserDto, UserPatchDto, UsersWithSettings } from "./user.dto"

import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { TokenPayloadDto } from "@auth/auth.dto"

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return data ? request.cookies?.[data] : request.cookies
  }
)

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Get("/from-cookie")
  @ApiResponse({ status: 200, type: UserDto })
  async getUserByCookie(
    @Cookies("token") token: string
  ): Promise<UserDto | null> {
    if (!token) {
      throw new UnauthorizedException("no token")
    }
    const payload = this.jwtService.decode<TokenPayloadDto>(token)
    if (!payload) {
      throw new UnauthorizedException()
    }
    const user = await this.userService.findOne({ id: payload.sub })
    return excludePasswordHash(user)
  }

  @Get("/:userId")
  @ApiResponse({ status: 200, type: UserDto })
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<UserDto | null> {
    const user = await this.userService.findOne({ id: userId })
    return excludePasswordHash(user)
  }

  @Patch("/:userId")
  @ApiResponse({ status: 200, type: UserDto })
  async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() body: UserPatchDto
  ): Promise<UserDto | null> {
    const user = await this.userService.updateOne({
      where: { id: userId },
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

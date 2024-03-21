import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UnauthorizedException,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserDto, UserPatchDto, UsersWithSettings } from "./user.dto"

import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { TokenPayloadDto } from "@auth/auth.dto"
import { Public } from "@auth/decorators/public.decorator"

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
    console.log("Received from-cookie request")
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

import { Body, Controller, Post, Res } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { Public } from "./decorators/public.decorator"
import { Response } from "express"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { SignInDto, SignUpDto, TokenPayloadDto } from "./auth.dto"

// The AuthController is responsible for handling incoming requests related to
// authentication. It uses the AuthService to handle the business logic for
// signing in and signing up users.

// The @Public() decorator is used to mark the signIn and signUp methods as
// publicly accessible, meaning that they can be accessed without a valid access
// token.

// The bearer token is sent in a secure httpOnly cookie, so that it can't be
// accessed by the client-side JavaScript.

// We send the token payload as a response to the client, so that the
// client-side JavaScript can use the token payload to have access to the user
// id to make requests to the API.
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiResponse({ status: 200, type: TokenPayloadDto })
  @Post("login")
  async signIn(
    @Body() signIn: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { payload, access_token } = await this.authService.signIn(
      signIn.email,
      signIn.password
    )
    response.cookie("token", access_token, { httpOnly: true })
    return payload
  }

  @Public()
  @ApiResponse({ status: 201, type: TokenPayloadDto })
  @Post("register")
  async signUp(
    @Body() signUp: SignUpDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { payload, access_token } = await this.authService.signUp(
      signUp.email,
      signUp.password
    )
    response.cookie("token", access_token, { httpOnly: true })
    return payload
  }

  @ApiResponse({ status: 204 })
  @Post("logout")
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("token")
  }
}

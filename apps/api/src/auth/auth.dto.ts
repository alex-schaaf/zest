import { ApiProperty } from "@nestjs/swagger"
import { TokenPayload } from "./auth.service"

export class SignInDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export class SignUpDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

export class TokenPayloadDto implements TokenPayload {
  @ApiProperty()
  sub: number
}

import { compare, genSalt, hash } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
}

async function validatePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return compare(password, passwordHash);
}

export interface TokenPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ payload: TokenPayload; access_token: string }> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await validatePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    return {
      payload,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ payload: TokenPayload; access_token: string }> {
    const passwordHash = await hashPassword(password);
    const user = await this.userService.createOne(email, passwordHash);

    const payload = { sub: user.id };

    return {
      payload,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

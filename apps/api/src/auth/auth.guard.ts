import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { IS_PUBLIC_KEY } from "./decorators/public.decorator";

type Payload = { sub: string };

type RequestWithOptionalPayload = Request & {
  user?: Payload;
  headers: Headers & { authorization?: string };
  cookies?: { token?: string };
};

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

@Injectable()
export class AuthGuard {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // if route is set to public, we don't need check for authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: RequestWithOptionalPayload = context
      .switchToHttp()
      .getRequest();

    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload; // make payload accessible to route handlers
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(
    request: RequestWithOptionalPayload
  ): string | undefined {
    return request.cookies?.token;
  }
}

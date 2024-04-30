import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"

import { IS_PUBLIC_KEY } from "./decorators/public.decorator"
import { Request } from "express"

type Payload = { sub: string }

export type RequestWithOptionalPayload = Request & {
  user?: Payload
  headers: Headers & { authorization?: string }
  cookies?: { token?: string }
}
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

@Injectable()
export class AuthGuard {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  /* 
    The `canActivate` method is called before the route handler is executed. It
    checks if the request is public or not. If it is public, it returns true and
    allows the request to continue. If it is not public, it checks if the
    request has a valid JWT token in the cookie. If it does, it verifies the
    token and allows the request to continue.
  */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /*
      The `IS_PUBLIC_KEY` is a custom metadata key. We use the `Reflector` to
      get the value of this key from the route handler or the route controller.
      If the route handler or the route controller has the `@Public()`
      decorator, we set the `isPublic` variable to `true`.
    */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromCookie(request)
    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = this.jwtService.verify<Payload>(token, {
        secret: process.env.JWT_SECRET,
      })
      /*
        If the request has a `userId` parameter, we check if it matches the
        `sub` claim of the JWT payload. If it does not match, a user is trying
        to access resources not owned by them.
      */
      const requestParamsUserId = request.params.userId
      if (requestParamsUserId && requestParamsUserId !== payload.sub) {
        throw new UnauthorizedException()
      }
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.token
  }
}

import { AuthGuard, RequestWithOptionalPayload } from "./auth.guard"
import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Reflector } from "@nestjs/core"
import { createMock } from "@golevelup/ts-jest"
import { Request } from "express"

describe("AuthGuard", () => {
  let reflector: Reflector
  let authGuard: AuthGuard

  beforeEach(() => {
    reflector = new Reflector()
    authGuard = new AuthGuard(new JwtService(), reflector)
  })

  it("should be defined", () => {
    expect(authGuard).toBeDefined()
  })

  describe("canActivate", () => {
    it("should return true if route is public", async () => {
      const contextMock = createMock<ExecutionContext>()
      reflector.getAllAndOverride = jest.fn().mockReturnValue(true)
      expect(await authGuard.canActivate(contextMock)).toBe(true)
    })

    it("should return true if token is valid", async () => {
      const contextMock = createMock<ExecutionContext>()
      reflector.getAllAndOverride = jest.fn().mockReturnValue(false)
      const requestMock = {
        cookies: {
          token: "valid-token",
        },
      } as RequestWithOptionalPayload

      contextMock.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(requestMock),
      })

      jest
        .spyOn(authGuard["jwtService"], "verify")
        .mockReturnValue({ sub: "1" })

      expect(await authGuard.canActivate(contextMock)).toBe(true)
    })

    it("should throw an UnauthorizedException if no token is provided", async () => {
      const contextMock = createMock<ExecutionContext>()
      reflector.getAllAndOverride = jest.fn().mockReturnValue(false)

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it("should throw an UnauthorizedException if token is invalid", async () => {
      const contextMock = createMock<ExecutionContext>()
      reflector.getAllAndOverride = jest.fn().mockReturnValue(false)
      const requestMock = {
        cookies: {
          token: "invalid-token",
        },
      }
      contextMock.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(requestMock),
      })

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException
      )
    })

    it("should throw an UnauthorizedException if the route params userId does not match the token sub", async () => {
      const contextMock = createMock<ExecutionContext>()
      reflector.getAllAndOverride = jest.fn().mockReturnValue(false)
      const requestMock = {
        cookies: {
          token: "valid-token",
        },
        params: {
          userId: "2",
        },
      } as unknown as Request

      contextMock.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(requestMock),
      })

      jest
        .spyOn(authGuard["jwtService"], "verify")
        .mockReturnValue({ sub: "1" })

      await expect(authGuard.canActivate(contextMock)).rejects.toThrow(
        UnauthorizedException
      )
    })
  })
})

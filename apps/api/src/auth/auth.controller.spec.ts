import { Test, TestingModule } from "@nestjs/testing"

import { AuthController } from "./auth.controller"
import { AuthService, hashPassword } from "./auth.service"
import { UserAlreadyExistsError, UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma.service"
import { BadRequestException, UnauthorizedException } from "@nestjs/common"
import { Response } from "express"

describe("AuthController", () => {
  let controller: AuthController
  let userService: UserService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, PrismaService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    userService = module.get<UserService>(UserService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("signIn should throw UnauthorizedException if user does not exist", async () => {
    const response = { cookie: jest.fn() } as any as Response
    const email = "non-registered@email.com"

    jest.spyOn(userService, "findOne").mockResolvedValueOnce(null)

    await expect(
      controller.signIn({ email, password: "password" }, response)
    ).rejects.toThrow(UnauthorizedException)
  })

  it("signIn should throw UnauthorizedException if password is invalid", async () => {
    const response = { cookie: jest.fn() } as any as Response
    const hashedPassword = await hashPassword("password")

    const user = {
      id: 1,
      email: "user@example.com",
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      settingsId: 1,
      settings: {
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        stravaClientId: null,
        stravaClientSecret: null,
        stravaAccessToken: null,
        stravaRefreshToken: null,
        stravaTokenExpiresAt: null,
      },
    }

    jest.spyOn(userService, "findOne").mockResolvedValueOnce(user)

    await expect(
      controller.signIn(
        { email: user.email, password: "wrongPassword" },
        response
      )
    ).rejects.toThrow(UnauthorizedException)
  })

  it("signIn should return payload with user id and cookie has been set with httpOnly cookie", async () => {
    const response = { cookie: jest.fn() } as any as Response
    const password = "plainPassword"
    const hashedPassword = await hashPassword(password)

    const user = {
      id: 1,
      email: "user@example.com",
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      settingsId: 1,
      settings: {
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        stravaClientId: null,
        stravaClientSecret: null,
        stravaAccessToken: null,
        stravaRefreshToken: null,
        stravaTokenExpiresAt: null,
      },
    }

    jest.spyOn(userService, "findOne").mockResolvedValueOnce(user)

    const payload = await controller.signIn(
      { email: user.email, password },
      response
    )

    expect(response.cookie).toHaveBeenCalled()
    expect(response.cookie).toHaveBeenCalledWith("token", expect.any(String), {
      httpOnly: true,
    })

    expect(payload).toHaveProperty("sub", user.id)
  })

  it("signUp should return payload with user id and cookie has been set with httpOnly cookie", async () => {
    const response = { cookie: jest.fn() } as any as Response
    const password = "plainPassword"
    const hashedPassword = await hashPassword(password)

    const user = {
      id: 1,
      email: "user@example.com",
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      settingsId: 1,
      settings: {
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        stravaClientId: null,
        stravaClientSecret: null,
        stravaAccessToken: null,
        stravaRefreshToken: null,
        stravaTokenExpiresAt: null,
      },
    }

    jest.spyOn(userService, "createOne").mockResolvedValueOnce(user)

    const payload = await controller.signUp(
      { email: user.email, password },
      response
    )

    expect(response.cookie).toHaveBeenCalled()
    expect(response.cookie).toHaveBeenCalledWith("token", expect.any(String), {
      httpOnly: true,
    })

    expect(payload).toHaveProperty("sub", user.id)
  })

  it("signUp should throw Exception if user already exists", async () => {
    const response = { cookie: jest.fn() } as any as Response
    const password = "plainPassword"
    const hashedPassword = await hashPassword(password)

    const user = {
      id: 1,
      email: "user@example.com",
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      settingsId: 1,
      settings: {
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        stravaClientId: null,
        stravaClientSecret: null,
        stravaAccessToken: null,
        stravaRefreshToken: null,
        stravaTokenExpiresAt: null,
      },
    }

    jest.spyOn(userService, "findOne").mockResolvedValue(user)

    await expect(
      controller.signUp({ email: user.email, password }, response)
    ).rejects.toThrow(UserAlreadyExistsError)
  })

  it("signUp should throw Exception if entered email is invalid", async () => {
    const response = { cookie: jest.fn() } as any as Response

    await expect(
      controller.signUp(
        { email: "invalid.email.com", password: "plainPassword" },
        response
      )
    ).rejects.toThrow(BadRequestException)
  })

  it("signUp should throw Exception if entered password is invalid", async () => {
    const response = { cookie: jest.fn() } as any as Response

    await expect(
      controller.signUp(
        { email: "valid@email.com", password: "tooshort" },
        response
      )
    ).rejects.toThrow(BadRequestException)
  })
})

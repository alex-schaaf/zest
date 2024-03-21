import { Test, TestingModule } from "@nestjs/testing"

import { PrismaService } from "../prisma.service"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

describe("UserController", () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it("should be defined", () => {
    expect(userController).toBeDefined()
  })

  describe("getUserById", () => {
    it("should return a user without password hash", async () => {
      const userInDB = {
        id: 1,
        email: "user@example.com",
        passwordHash: "hashedPassword",
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

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(userInDB)

      const queriedUser = await userController.getUserById("1")
      expect(queriedUser).not.toHaveProperty("passwordHash")
    })
  })

  describe("updateUser", () => {
    it("should return an updated user without a password hash", async () => {
      const newEmail = "new@example.com"
      const user = {
        id: 1,
        email: "user@example.com",
        passwordHash: "hashedPassword",
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

      jest
        .spyOn(userService, "updateOne")
        .mockResolvedValueOnce({ ...user, email: newEmail as string })

      const updatedUser = await userController.updateUser(user.id.toString(), {
        email: newEmail,
      })

      expect(updatedUser?.email).toBe("new@example.com")
      expect(updatedUser).not.toHaveProperty("passwordHash")
    })
  })
})

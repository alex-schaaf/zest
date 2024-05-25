import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { User, Prisma } from "@prisma/client"
import { UserPatchDto, UsersWithSettings } from "./user.dto"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<UsersWithSettings | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { settings: true },
    })
  }

  async createOne(
    email: string,
    passwordHash: string
  ): Promise<UsersWithSettings> {
    const existingUser = await this.findOne({ email })
    if (existingUser) throw new UserAlreadyExistsError("User already exists")

    return this.prisma.user.create({
      data: { email, passwordHash, settings: { create: {} } },
      include: { settings: true },
    })
  }

  async updateOne(params: {
    where: Prisma.UserWhereUniqueInput
    data: UserPatchDto
  }): Promise<UsersWithSettings> {
    const { where, data } = params
    const { settings, ...userData } = data
    return this.prisma.user.update({
      data: { ...userData, settings: { update: settings } },
      where,
      include: { settings: true },
    })
  }

  async deleteOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "UserAlreadyExistsError"

    // This line is needed to restore the correct prototype chain.
    Object.setPrototypeOf(this, new.target.prototype)

    // This line is needed to make the stack trace work correctly.
    Error.captureStackTrace(this, this.constructor)
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Users, Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createOne(email: string, passwordHash: string): Promise<Users> {
    const existingUser = await this.findOne({ email });
    if (existingUser) throw new UserAlreadyExistsError();

    return this.prisma.users.create({
      data: { email, passwordHash, settings: { create: {} } },
    });
  }

  async updateOne(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.prisma.users.update({ data, where });
  }

  async deleteOne(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({ where });
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UserAlreadyExistsError";

    // This line is needed to restore the correct prototype chain.
    Object.setPrototypeOf(this, new.target.prototype);

    // This line is needed to make the stack trace work correctly.
    Error.captureStackTrace(this, this.constructor);
  }
}

import { hash } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { Prisma } from "@prisma/client";

class UserService {
  constructor() {}

  async find(where: Prisma.UsersWhereUniqueInput) {
    const user = await prisma.users.findUnique({ where });
    return user;
  }

  async create(data: Prisma.UsersCreateInput) {
    return await prisma.users.create({ data });
  }

  async update(
    where: Prisma.UsersWhereUniqueInput,
    data: Prisma.UsersUpdateInput
  ) {
    return await prisma.users.update({ where, data });
  }

  async delete(where: Prisma.UsersWhereUniqueInput) {
    return await prisma.users.delete({ where });
  }
}

const userService = new UserService();

export default userService;

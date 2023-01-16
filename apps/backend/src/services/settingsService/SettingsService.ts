import { prisma } from "../../lib/db";
import { Prisma } from "@prisma/client";

class SettingsService {
  constructor() {}

  // async findMany() {}

  // async find(where) {}

  // async create(data) {}

  async update(
    where: Prisma.SettingsWhereUniqueInput,
    data: Prisma.SettingsUpdateInput
  ) {
    return await prisma.settings.update({ where, data });
  }

  // async delete(where) {}
}

const settingsService = new SettingsService();

export default settingsService;

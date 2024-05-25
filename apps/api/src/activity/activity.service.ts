import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { SummaryActivity } from "./strava-types"
import { Prisma } from "@prisma/client"

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number) {
    return this.prisma.activity.findUnique({
      where: { id: userId },
    })
  }

  async findMany(
    userId: number,
    filters?: { startDateGte?: Date; startDateLte?: Date },
    orderBy = "startDate",
    order: "asc" | "desc" = "desc",
    skip = 0,
    take?: number
  ) {
    const prismaWhere: Prisma.ActivityFindManyArgs = {
      where: {
        userId,
        active: true,
        type: {
          equals: "Run",
        },
        startDate: {
          gte: filters?.startDateGte,
          lte: filters?.startDateLte,
        },
      },
      orderBy: {
        [orderBy]: order,
      },
      skip,
      take,
    }
    return this.prisma.activity.findMany(prismaWhere)
  }

  async createMany(userId: number, data: SummaryActivity[]) {
    const parsedData = data.map((summaryActivity) => ({
      id: BigInt(summaryActivity.id),
      type: summaryActivity.type,
      distance: summaryActivity.distance,
      time: summaryActivity.moving_time,
      speed: summaryActivity.average_speed,
      elevationGain: summaryActivity.total_elevation_gain,
      startDate: summaryActivity.start_date,
      averageHeartrate: summaryActivity.average_heartrate,
      data: Buffer.from(JSON.stringify(summaryActivity)),
      originService: "strava",
      userId,
    }))

    return this.prisma.activity.createMany({
      data: parsedData,
    })
  }

  async deleteOne(id: number) {
    return this.prisma.activity.update({
      where: { id },
      data: { active: false },
    })
  }
}

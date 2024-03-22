import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { SummaryActivity } from "./strava-types"
import { Prisma } from "@prisma/client"

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number) {
    return this.prisma.activities.findUnique({
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
    const prismaWhere: Prisma.ActivitiesFindManyArgs = {
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
    return this.prisma.activities.findMany(prismaWhere)
  }

  // async createOne(userId: number, data: SummaryActivity) {
  //   const parsedData: Prisma.ActivitiesCreateInput = {
  //     id: BigInt(data.id),
  //     type: data.type,
  //     distance: data.distance,
  //     time: data.moving_time,
  //     speed: data.average_speed,
  //     elevationGain: data.total_elevation_gain,
  //     startDate: data.start_date,
  //     averageHeartrate: data.average_heartrate,
  //     data: data as unknown as Prisma.InputJsonValue,
  //     Users: {
  //       connect: {
  //         id: userId,
  //       },
  //     },
  //     originService: "strava",
  //   }

  //   return this.prisma.activities.create({
  //     data: parsedData,
  //   })
  // }

  async createMany(userId: number, data: SummaryActivity[]) {
    const parsedData = data.map((activity) => ({
      id: BigInt(activity.id),
      type: activity.type,
      distance: activity.distance,
      time: activity.moving_time,
      speed: activity.average_speed,
      elevationGain: activity.total_elevation_gain,
      startDate: activity.start_date,
      averageHeartrate: activity.average_heartrate,
      data: activity as unknown as Prisma.InputJsonValue,
      originService: "strava",
      userId,
    }))

    return this.prisma.activities.createMany({
      data: parsedData,
      skipDuplicates: true,
    })
  }

  async deleteOne(id: number) {
    return this.prisma.activities.update({
      where: { id },
      data: { active: false },
    })
  }
}

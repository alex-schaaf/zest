import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SummaryActivity } from './strava-types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number) {
    return this.prisma.stravaActivities.findUnique({
      where: { id: userId },
    });
  }

  async findMany(
    userId: number,
    filters?: { startDateGte?: Date; startDateLte?: Date },
    orderBy = 'startDate',
    order: 'asc' | 'desc' = 'desc',
    skip = 0,
    take?: number,
  ) {
    const prismaWhere: Prisma.StravaActivitiesFindManyArgs = {
      where: {
        userId,
        active: true,
        type: {
          equals: 'Run',
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
    };
    return this.prisma.stravaActivities.findMany(prismaWhere);
  }

  async createOne(userId: number, data: SummaryActivity) {
    const parsedData: Prisma.StravaActivitiesCreateInput = {
      id: data.id,
      type: data.type,
      distance: data.distance,
      time: data.moving_time,
      speed: data.average_speed,
      elevationGain: data.total_elevation_gain,
      startDate: data.start_date,
      averageHeartrate: data.average_heartrate,
      data: data as unknown as Prisma.InputJsonValue,
      Users: {
        connect: {
          id: userId,
        },
      },
    };

    return this.prisma.stravaActivities.create({
      data: parsedData,
    });
  }

  async deleteOne(id: number) {
    return this.prisma.stravaActivities.update({
      where: { id },
      data: { active: false },
    });
  }
}

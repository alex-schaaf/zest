import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db";

interface StravaActivity {
  id: number;
  type: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  total_elevation_gain: number;
  start_date: Date;
}

/**
 * BigInt (strava activity id) has no json-serialization built-int,
 * so we have to simply convert it to a string when serializing.
 */
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

class StravaActivityService {
  constructor() {}

  async findMany(args: Prisma.StravaActivitiesFindManyArgs) {
    return await prisma.stravaActivities.findMany(args);
  }

  async find(where: Prisma.StravaActivitiesFindUniqueOrThrowArgs) {
    // TODO protect with userId?
    return await prisma.stravaActivities.findUnique(where);
  }

  async create(userId: number, data: StravaActivity) {
    const d: Prisma.StravaActivitiesCreateInput = {
      id: data.id,
      type: data.type,
      distance: data.distance,
      time: data.moving_time,
      speed: data.average_speed,
      elevationGain: data.total_elevation_gain,
      startDate: data.start_date,
      data: JSON.stringify(data),
      Users: {
        connect: {
          id: userId,
        },
      },
    };

    return await prisma.stravaActivities.create({ data: d });
  }

  // async update(where, data) {}

  async delete(where: Prisma.StravaActivitiesWhereUniqueInput) {
    return await prisma.stravaActivities.update({
      where,
      data: { active: false },
    });
  }
}

const stravaActivityService = new StravaActivityService();

export default stravaActivityService;

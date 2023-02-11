import { Prisma, StravaActivities } from "@prisma/client";
import { prisma } from "../../lib/db";
import { SummaryActivity } from "strava-types";

function exclude<StravaActivities, Key extends keyof StravaActivities>(
  activity: StravaActivities,
  keys: Key[]
): Omit<StravaActivities, Key> {
  for (let key of keys) {
    delete activity[key];
  }
  return activity;
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
    const activities = await prisma.stravaActivities.findMany(args);
    return activities.map((a) => exclude(a, ["data"]));
  }

  async find(where: Prisma.StravaActivitiesFindUniqueOrThrowArgs) {
    const activity = await prisma.stravaActivities.findUniqueOrThrow(where);
    return exclude(activity, ["data"]);
  }

  async create(userId: number, data: SummaryActivity) {
    const d: Prisma.StravaActivitiesCreateInput = {
      id: data.id,
      type: data.type,
      distance: data.distance,
      time: data.moving_time,
      speed: data.average_speed,
      elevationGain: data.total_elevation_gain,
      startDate: data.start_date,
      data: data as unknown as Prisma.InputJsonValue,
      Users: {
        connect: {
          id: userId,
        },
      },
    };

    const activity = await prisma.stravaActivities.create({ data: d });
    return exclude(activity, ["data"]);
  }

  // async update(where, data) {}

  async delete(where: Prisma.StravaActivitiesWhereUniqueInput) {
    const activity = await prisma.stravaActivities.update({
      where,
      data: { active: false },
    });
    return exclude(activity, ["data"]);
  }
}

const stravaActivityService = new StravaActivityService();

export default stravaActivityService;

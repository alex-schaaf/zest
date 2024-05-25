import { Test, TestingModule } from "@nestjs/testing"
import { ActivityController } from "./activity.controller"
import { ActivityService } from "./activity.service"
import { PrismaService } from "../prisma.service"
import { SummaryActivity } from "./strava-types"

describe("ActivityController", () => {
  let controller: ActivityController
  let prismaService: PrismaService
  let activityService: ActivityService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService, PrismaService],
    }).compile()

    controller = module.get<ActivityController>(ActivityController)
    activityService = module.get<ActivityService>(ActivityService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("findOne should return an activity without data field", async () => {
    const mockActivity = {
      id: BigInt("1"),
      type: "Run",
      distance: 1000,
      time: 1000,
      speed: 10,
      elevationGain: 400,
      averageHeartrate: 136,
      startDate: new Date(),
      active: true,
      userId: 1,
      originService: "strava",
      data: Buffer.from("some data"),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    jest.spyOn(activityService, "findOne").mockResolvedValueOnce(mockActivity)

    const activity = await controller.getActivityById(1, 1)

    expect(activity).not.toBeNull()
    expect(activity).not.toHaveProperty("data")
  })

  it("deleteOne should return an activity without data field", async () => {
    const mockActivity = {
      id: BigInt("1"),
      type: "Run",
      distance: 1000,
      time: 1000,
      speed: 10,
      elevationGain: 400,
      averageHeartrate: 136,
      startDate: new Date(),
      active: true,
      data: Buffer.from("some data"),
      userId: 1,
      originService: "strava",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    jest.spyOn(activityService, "deleteOne").mockResolvedValueOnce(mockActivity)

    const activity = await controller.deleteActivityById(1, 1)

    expect(activity).not.toBeNull()
    expect(activity).not.toHaveProperty("data")
  })

  it("findMany should return activities without data field", async () => {
    const mockActivities = [
      {
        id: BigInt("1"),
        type: "Run",
        distance: 1000,
        time: 1000,
        speed: 10,
        elevationGain: 400,
        averageHeartrate: 136,
        startDate: new Date(),
        active: true,
        data: Buffer.from("some data"),
        userId: 1,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: BigInt("2"),
        type: "Run",
        distance: 1000,
        time: 1000,
        speed: 10,
        elevationGain: 400,
        averageHeartrate: 136,
        startDate: new Date(),
        active: true,
        data: Buffer.from("some data"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    prismaService.activity.findMany = jest
      .fn()
      .mockReturnValueOnce(mockActivities)

    const activities = await controller.getActivities(1)

    expect(activities).toHaveLength(2)
    expect(activities[0]).not.toHaveProperty("data")
    expect(activities[1]).not.toHaveProperty("data")
  })

  it("createMany should return an activity without data field", async () => {
    const mockStravaSummaryActivity = {
      id: 123,
      external_id: "abc123",
      upload_id: 456,
      athlete: { id: 789 },
      name: "Test Activity",
      distance: 1000,
      moving_time: 600,
      elapsed_time: 700,
      total_elevation_gain: 100,
      elev_high: 50,
      elev_low: 0,
      type: "Run",
      start_date: new Date().toISOString(),
      start_date_local: new Date().toISOString(),
      timezone: "America/Los_Angeles",
      start_latlng: [37.7749, -122.4194],
      end_latlng: [37.7749, -122.4194],
      achievement_count: 0,
      kudos_count: 0,
      comment_count: 0,
      athlete_count: 1,
      photo_count: 0,
      total_photo_count: 0,
      map: { id: "map1", polyline: "abc", summary_polyline: "abc" },
      trainer: false,
      commute: false,
      manual: false,
      private: false,
      flagged: false,
      workout_type: 0,
      average_speed: 10,
      average_heartrate: 120,
      max_speed: 15,
      has_kudoed: false,
    } as unknown as SummaryActivity

    jest
      .spyOn(activityService, "createMany")
      .mockResolvedValueOnce({ count: 1 })

    const count = await controller.createActivity(1, mockStravaSummaryActivity)

    expect(count).not.toBeNull()
  })
})

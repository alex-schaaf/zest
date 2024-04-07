import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Query,
  BadRequestException,
} from "@nestjs/common"
import { ActivityService } from "./activity.service"

import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger"
import { ActivityDto, CreateActivityDto } from "./activity.dto"
import { Activities } from "@prisma/client"
import { ParseOptionalIntPipe } from "@/utils/pipes"
import { createActivitiesSchema } from "./activity.schema"

function excludeActivityData(
  activity: ActivityDto | null
): Omit<ActivityDto, "data"> | null {
  if (!activity) return null
  const { data, ...activityWithoutData } = activity
  return activityWithoutData
}

class CreateActivityResponseDto {
  count: number
}

@ApiTags("activities")
@Controller("/users/:userId/activities")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiResponse({ status: 200, type: [ActivityDto] })
  async getActivities(
    @Param("userId", ParseIntPipe) userId: number,
    @Query("startDateGte") startDateGte?: Date,
    @Query("startDateLte") startDateLte?: Date,
    @Query("orderBy") orderBy?: keyof Omit<Activities, "data">,
    @Query("order") order?: "asc" | "desc",
    @Query("skip", ParseOptionalIntPipe)
    skip?: number | undefined,
    @Query("take", ParseOptionalIntPipe) take?: number | undefined
  ) {
    const activities = await this.activityService.findMany(
      userId,
      {
        startDateGte,
        startDateLte,
      },
      orderBy,
      order,
      skip,
      take
    )
    return activities.map(excludeActivityData)
  }

  @Get("/:activityId")
  @ApiResponse({ status: 200, type: ActivityDto })
  async getActivityById(@Param("activityId", ParseIntPipe) activityId: number) {
    const activity = await this.activityService.findOne(activityId)
    return excludeActivityData(activity)
  }

  @Post()
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, type: CreateActivityResponseDto })
  async createActivity(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() activities: CreateActivityDto[] | CreateActivityDto
  ) {
    if (!Array.isArray(activities)) {
      activities = [activities]
    }
    try {
      createActivitiesSchema.parse(activities)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
    return await this.activityService.createMany(userId, activities)
  }

  @Delete("/:activityId")
  @ApiResponse({ status: 200, type: ActivityDto })
  async deleteActivityById(
    @Param("activityId", ParseIntPipe) activityId: number
  ) {
    const activity = await this.activityService.deleteOne(activityId)
    return excludeActivityData(activity)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from "@nestjs/common"
import { ActivityService } from "./activity.service"

import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger"
import { ActivityDto, createActivityDto } from "./activity.dto"
import { Activities } from "@prisma/client"

function excludeActivityData(
  activity: ActivityDto | null
): Omit<ActivityDto, "data"> | null {
  if (!activity) return null
  const { data, ...activityWithoutData } = activity
  return activityWithoutData
}

@Injectable()
export class ParseOptionalIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      return undefined
    }
    return val
  }
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

  @Get("/:id")
  @ApiResponse({ status: 200, type: ActivityDto })
  async getActivityById(@Param("id") id: string) {
    const activity = await this.activityService.findOne(Number(id))
    return excludeActivityData(activity)
  }
  @Post()
  @ApiBody({ type: createActivityDto })
  @ApiResponse({ status: 201, type: ActivityDto })
  async createActivity(
    @Param("userId") userId: string,
    @Body("activity") activity: createActivityDto
  ) {
    const createdActivity = await this.activityService.createOne(
      Number(userId),
      activity
    )
    return excludeActivityData(createdActivity)
  }

  @Delete("/:id")
  @ApiResponse({ status: 200, type: ActivityDto })
  async deleteActivityById(@Param("id") id: string) {
    const activity = await this.activityService.deleteOne(Number(id))
    return excludeActivityData(activity)
  }
}

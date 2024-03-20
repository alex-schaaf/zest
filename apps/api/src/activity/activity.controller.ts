import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityDto, createActivityDto } from './activity.dto';

function excludeActivityData(
  activity: ActivityDto | null,
): Omit<ActivityDto, 'data'> | null {
  if (activity === null) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, ...activityWithoutData } = activity;
  return activityWithoutData;
}

@ApiTags('activities')
@Controller('/users/:userId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiResponse({ status: 200, type: [ActivityDto] })
  async getActivities(@Param('userId') userId: string) {
    const activities = await this.activityService.findMany(Number(userId));
    return activities.map(excludeActivityData);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: ActivityDto })
  async getActivityById(@Param('id') id: string) {
    const activity = await this.activityService.findOne(Number(id));
    return excludeActivityData(activity);
  }
  @Post()
  @ApiBody({ type: createActivityDto })
  @ApiResponse({ status: 201, type: ActivityDto })
  async createActivity(
    @Param('userId') userId: string,
    @Body('activity') activity: createActivityDto,
  ) {
    const createdActivity = await this.activityService.createOne(
      Number(userId),
      activity,
    );
    return excludeActivityData(createdActivity);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: ActivityDto })
  async deleteActivityById(@Param('id') id: string) {
    const activity = await this.activityService.deleteOne(Number(id));
    return excludeActivityData(activity);
  }
}

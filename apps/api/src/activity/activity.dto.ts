import { ApiProperty } from '@nestjs/swagger';

import { Activities } from '@prisma/client';
import { ActivityType, MetaAthlete, PolylineMap } from './strava-types';
import { JsonValue } from '@prisma/client/runtime/library';

export class createActivityDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  external_id: string;
  @ApiProperty()
  upload_id: number;
  @ApiProperty()
  athlete: MetaAthlete;
  @ApiProperty()
  name: string;
  @ApiProperty()
  distance: number;
  @ApiProperty()
  moving_time: number;
  @ApiProperty()
  elapsed_time: number;
  @ApiProperty()
  total_elevation_gain: number;
  @ApiProperty()
  elev_high: number;
  @ApiProperty()
  elev_low: number;
  @ApiProperty()
  type: ActivityType;
  @ApiProperty()
  start_date: Date;
  @ApiProperty()
  start_date_local: Date;
  @ApiProperty()
  timezone: string;
  @ApiProperty()
  start_latlng: number[];
  @ApiProperty()
  end_latlng: number[];
  @ApiProperty()
  achievement_count: number;
  @ApiProperty()
  kudos_count: number;
  @ApiProperty()
  comment_count: number;
  @ApiProperty()
  athlete_count: number;
  @ApiProperty()
  photo_count: number;
  @ApiProperty()
  total_photo_count: number;
  @ApiProperty()
  map: PolylineMap;
  @ApiProperty()
  trainer: boolean;
  @ApiProperty()
  commute: boolean;
  @ApiProperty()
  manual: boolean;
  @ApiProperty()
  private: boolean;
  @ApiProperty()
  flagged: boolean;
  @ApiProperty()
  workout_type: number;
  @ApiProperty()
  average_speed: number;
  @ApiProperty()
  average_heartrate: number | null;
  @ApiProperty()
  max_speed: number;
  @ApiProperty()
  has_kudoed: boolean;
}

export class ActivityDto implements Activities {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  type: string;
  @ApiProperty()
  distance: number;
  @ApiProperty()
  time: number;
  @ApiProperty()
  speed: number;
  @ApiProperty()
  elevationGain: number;
  @ApiProperty()
  averageHeartrate: number | null;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  data: null | JsonValue;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  originService: string;
}

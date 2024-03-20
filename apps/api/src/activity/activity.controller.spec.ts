import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaService } from '../prisma.service';

describe('ActivityController', () => {
  let controller: ActivityController;
  let prismaService: PrismaService;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService, PrismaService],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    activityService = module.get<ActivityService>(ActivityService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne should return an activity without data field', async () => {
    const mockActivity = {
      id: BigInt('1'),
      type: 'Run',
      distance: 1000,
      time: 1000,
      speed: 10,
      elevationGain: 400,
      averageHeartrate: 136,
      startDate: new Date(),
      active: true,
      data: { someData: 123 },
      userId: 1,
    };

    jest.spyOn(activityService, 'findOne').mockResolvedValueOnce(mockActivity);

    const activity = await controller.getActivityById('1');

    expect(activity).not.toBeNull();
    expect(activity).not.toHaveProperty('data');
  });

  it('deleteOne should return an activity without data field', async () => {
    const mockActivity = {
      id: BigInt('1'),
      type: 'Run',
      distance: 1000,
      time: 1000,
      speed: 10,
      elevationGain: 400,
      averageHeartrate: 136,
      startDate: new Date(),
      active: true,
      data: { someData: 123 },
      userId: 1,
    };

    jest
      .spyOn(activityService, 'deleteOne')
      .mockResolvedValueOnce(mockActivity);

    const activity = await controller.deleteActivityById('1');

    expect(activity).not.toBeNull();
    expect(activity).not.toHaveProperty('data');
  });

  it('findMany should return activities without data field', async () => {
    const mockActivities = [
      {
        id: BigInt('1'),
        type: 'Run',
        distance: 1000,
        time: 1000,
        speed: 10,
        elevationGain: 400,
        averageHeartrate: 136,
        startDate: new Date(),
        active: true,
        data: { someData: 123 },
        userId: 1,
      },
      {
        id: BigInt('2'),
        type: 'Run',
        distance: 1000,
        time: 1000,
        speed: 10,
        elevationGain: 400,
        averageHeartrate: 136,
        startDate: new Date(),
        active: true,
        data: { someData: 123 },
        userId: 1,
      },
    ];

    prismaService.stravaActivities.findMany = jest
      .fn()
      .mockReturnValueOnce(mockActivities);

    const activities = await controller.getActivities('1');

    expect(activities).toHaveLength(2);
    expect(activities[0]).not.toHaveProperty('data');
    expect(activities[1]).not.toHaveProperty('data');
  });
});

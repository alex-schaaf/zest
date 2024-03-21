import { Module } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { ActivityController } from "./activity.controller"
import { PrismaService } from "@/prisma.service"

@Module({
  providers: [ActivityService, PrismaService],
  controllers: [ActivityController],
})
export class ActivityModule {}

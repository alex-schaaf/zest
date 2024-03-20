import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { UserModule } from "./user/user.module";
import { ActivityModule } from "./activity/activity.module";

@Module({
  imports: [AuthModule, UserModule, ActivityModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

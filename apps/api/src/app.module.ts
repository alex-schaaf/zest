import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ActivityModule } from "./activity/activity.module";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [AuthModule, UserModule, ActivityModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { ActivityModule } from "./activity/activity.module"
import { PrismaModule } from "./prisma.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    AuthModule,
    UserModule,
    ActivityModule,
    PrismaModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

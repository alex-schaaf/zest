import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { ActivityModule } from "./activity/activity.module"
import { PrismaModule } from "./prisma.module"
import { ConfigModule } from "@nestjs/config"
import { LoggerModule } from "nestjs-pino"

const loggerConfig = {
  pinoHttp: {
    customProps: () => ({
      context: "HTTP",
    }),
    transport: {
      target: "pino-pretty",
      options: {
        singleLine: true,
      },
    },
    redact: ["req.headers", "res.headers"],
  },
}

@Module({
  imports: [
    AuthModule,
    UserModule,
    ActivityModule,
    PrismaModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot(loggerConfig),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

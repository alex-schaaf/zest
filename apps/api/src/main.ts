import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger"

import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  })

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle("zest-api")
    .setDescription("The zest api for ingesting and loading exercise data.")
    .setVersion("0.1.0")
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup("docs", app, document)

  app.use(cookieParser())

  await app.listen(3000)
}

bootstrap()

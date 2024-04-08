import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger"

import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { Logger } from "nestjs-pino"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useLogger(app.get(Logger))

  /*
   * Enable versioning. This allows for multiple versions of the API to be
   * maintained simultaneously. The default version is "1", and the version is
   * specified in the URI.
   */
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  })

  /*
   * Enable Swagger documentation. This is useful for development, but should be
   * disabled in production to prevent exposing the API to the public.
   */
  if (process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("zest-api")
      .setDescription("The zest api for ingesting and loading exercise data.")
      .setVersion("0.1.0")
      .build()
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    }
    const document = SwaggerModule.createDocument(app, config, options)
    SwaggerModule.setup("docs", app, document)
  }

  /*
   * Enable cookie parsing. This is necessary to access the authentication token
   * stored in an http-onlu cookie.
   */
  app.use(cookieParser())

  /*
   * Enable the following allows cross-origin requests. This is useful for
   * development, but should be disabled in production to prevent CSRF attacks.
   */
  if (process.env.NODE_ENV === "development") {
    app.enableCors({
      origin: `http://localhost:${process.env.FRONTEND_PORT}`,
      credentials: true,
    })
  }

  await app.listen(process.env.BACKEND_PORT!)
}

bootstrap()

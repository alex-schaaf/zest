import { Controller, Get, Res } from "@nestjs/common"
import { Public } from "@/auth/decorators/public.decorator"
import { Response } from "express"

@Controller()
export class AppController {
  @Public()
  @Get("health")
  getHealth(@Res() res: Response): void {
    res.status(200).send()
  }
}

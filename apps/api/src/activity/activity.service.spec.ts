import { Test, TestingModule } from "@nestjs/testing"
import { ActivityService } from "./activity.service"
import { PrismaService } from "@/prisma.service"

describe("ActivityService", () => {
  let service: ActivityService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityService, PrismaService],
    }).compile()

    service = module.get<ActivityService>(ActivityService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})

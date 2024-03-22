import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"

describe("AppController", () => {
  let appController: AppController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    appController = module.get<AppController>(AppController)
  })

  it("should be defined", () => {
    expect(appController).toBeDefined()
  })

  it("getHealth should return a 200 status code", async () => {
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    } as any

    appController.getHealth(res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalled()
  })
})

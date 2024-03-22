import { AuthModule } from "./auth.module"

describe("AuthModule", () => {
  let authModule: AuthModule

  beforeEach(async () => {
    authModule = new AuthModule()
  })

  it("should be defined", () => {
    expect(authModule).toBeDefined()
  })
})
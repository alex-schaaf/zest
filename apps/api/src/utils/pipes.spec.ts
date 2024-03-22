import { ArgumentMetadata } from "@nestjs/common"
import { ParseOptionalIntPipe } from "./pipes"

describe("ParseOptionalIntPipe", () => {
  let pipe: ParseOptionalIntPipe

  beforeEach(() => {
    pipe = new ParseOptionalIntPipe()
  })

  const metadata: ArgumentMetadata = {
    type: "query",
    metatype: undefined,
    data: '@Query("skip")',
  }

  it("should parse a valid integer", () => {
    expect(pipe.transform("123", metadata)).toBe(123)
    expect(pipe.transform("-123", metadata)).toBe(-123)
  })

  it("should return undefined for an invalid integer", () => {
    expect(pipe.transform("abc", metadata)).toBeUndefined()
  })
})

import Stat from "./Stat"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test("Stat renders compound components correctly", async () => {
  // ARRANGE
  render(
    <Stat>
      <Stat.Title>title</Stat.Title>
      <Stat.Value>value</Stat.Value>
      <Stat.Subtitle>subtitle</Stat.Subtitle>
    </Stat>
  )

  // ACT
  // -

  // ASSERT
  const title = screen.getByText("title")
  expect(title).toBeInTheDocument()
  const value = screen.getByText("value")
  expect(value).toBeInTheDocument()
  const subtitle = screen.getByText("subtitle")
  expect(subtitle).toBeInTheDocument()
})

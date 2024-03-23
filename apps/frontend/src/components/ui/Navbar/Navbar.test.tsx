import Navbar from "./Navbar"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test("", async () => {
  // ARRANGE
  render(<Navbar />)

  // ACT
  const title = screen.getByText("self.fit")

  // ASSERT
  expect(title).toBeInTheDocument()
})

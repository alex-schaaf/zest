import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Navbar from "./Navbar"

test("", async () => {
  // ARRANGE
  render(<Navbar />)

  // ACT
  const title = screen.getByText("self.fit")

  // ASSERT
  expect(title).toBeInTheDocument()
})

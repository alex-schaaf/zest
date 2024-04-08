import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import StatCard from "./StatCard"

describe("StatCard", () => {
  it("should render the component", () => {
    const title = "Total Distance"
    const value = 0
    const unit = "km"
    render(<StatCard title={title} value={value} unit={unit} />)

    const titleElement = screen.getByText(title)
    const valueElement = screen.getByText(value)
    const unitElement = screen.getByText(unit)

    expect(titleElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
    expect(unitElement).toBeInTheDocument()
  })
})

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import TrendBadge from "./TrendBadge"

describe("TrendBadge", () => {
  it("should render no value if values did not change", () => {
    const currentValue = 0
    const unit = "km"
    render(
      <TrendBadge
        current={currentValue}
        previous={currentValue}
        unit={unit}
        precision={0}
      />
    )
    const valueElement = screen.getByText("-")
    const unitElement = screen.getByText(unit)

    expect(valueElement).toBeInTheDocument()
    expect(unitElement).toBeInTheDocument()
  })

  it("should render positive change correctly", () => {
    const currentValue = 10
    const previousValue = 7
    const unit = "km"
    const precision = 0
    const { container } = render(
      <TrendBadge
        current={currentValue}
        previous={previousValue}
        unit={unit}
        precision={precision}
      />
    )
    const difference = currentValue - previousValue
    const valueElement = screen.getByText(difference.toFixed(precision))

    const successElement = container.querySelector(".text-success-500")
    const unitElement = screen.getByText(unit)

    expect(valueElement).toBeInTheDocument()
    expect(successElement).toBeInTheDocument()
    expect(unitElement).toBeInTheDocument()
  })

  it("should render positive change correctly", () => {
    const currentValue = 10
    const previousValue = 7
    const unit = "km"
    const precision = 0
    render(
      <TrendBadge
        current={currentValue}
        previous={previousValue}
        unit={unit}
        precision={precision}
      />
    )
    const difference = currentValue - previousValue
    const valueElement = screen.getByText(difference.toFixed(precision))

    const successElement = screen.getByTestId("change-indicator")
    const unitElement = screen.getByText(unit)

    expect(valueElement).toBeInTheDocument()
    expect(successElement).toBeInTheDocument()
    expect(successElement).toHaveClass(/text-success-\d{3}/)
    expect(unitElement).toBeInTheDocument()
  })

  it("should render negative change correctly", () => {
    const currentValue = 7
    const previousValue = 10
    const unit = "km"
    const precision = 0
    render(
      <TrendBadge
        current={currentValue}
        previous={previousValue}
        unit={unit}
        precision={precision}
      />
    )
    const difference = Math.abs(currentValue - previousValue)
    const valueElement = screen.getByText(difference.toFixed(precision))

    const successElement = screen.getByTestId("change-indicator")
    const unitElement = screen.getByText(unit)

    expect(valueElement).toBeInTheDocument()
    expect(successElement).toBeInTheDocument()
    expect(successElement).toHaveClass(/text-danger-\d{3}/)
    expect(unitElement).toBeInTheDocument()
  })
})

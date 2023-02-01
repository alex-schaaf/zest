import TrendBadge from "./TrendBadge"

describe("<TrendBadge />", () => {
  it("renders positive trend correctly", () => {
    cy.mount(<TrendBadge current={10} previous={5} unit={"km"} />)
    cy.contains("↑ 5.0 km")

    cy.get("span")
      .then(($el) => $el[0].className)
      .should("match", /bg-success/)
  })

  it("renders negative trend correctly", () => {
    cy.mount(<TrendBadge current={5} previous={10} unit={"km"} />)
    cy.contains("↓ 5.0 km")

    cy.get("span")
      .then(($el) => $el[0].className)
      .should("match", /bg-danger/)
  })

  it("renders neutral trend correctly", () => {
    cy.mount(<TrendBadge current={10} previous={10} unit={"km"} />)
    cy.contains("- km")

    cy.get("span")
      .then(($el) => $el[0].className)
      .should("match", /bg-warning/)
  })

  it("renders positive trend correctly with given precision", () => {
    cy.mount(<TrendBadge current={10} previous={5} unit={"km"} precision={3} />)
    cy.contains("↑ 5.000 km")
  })
})

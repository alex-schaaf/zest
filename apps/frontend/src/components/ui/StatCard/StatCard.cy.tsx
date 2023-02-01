import StatCard from "./StatCard"

describe("<StatCard />", () => {
  it("renders stats card contents correctly", () => {
    const data = {
      title: "Total Distance",
      value: 10,
      previousValue: 15,
      unit: "km",
    }

    cy.mount(<StatCard {...data} />)

    cy.contains(`${data.title}`).should("exist")
    cy.contains(`${data.value} ${data.unit}`).should("exist")
    cy.contains(
      `↓ ${Math.abs(data.value - data.previousValue).toFixed(1)} ${data.unit}`
    ).should("exist")
  })

  it("renders time correctly", () => {
    const data = {
      title: "Total Distance",
      value: 90,
      previousValue: 180,
      unit: "min",
      precision: 0,
    }

    cy.mount(<StatCard {...data} />)

    cy.contains(`${data.title}`).should("exist")
    cy.contains("1h 30min").should("exist")
    cy.contains(
      `↓ ${Math.abs(data.value - data.previousValue).toFixed(1)} ${data.unit}`
    ).should("exist")
  })
})

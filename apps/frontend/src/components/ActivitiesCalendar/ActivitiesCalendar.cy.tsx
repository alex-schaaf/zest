import dayjs from "dayjs"
import { useState } from "react"
import ActivitiesCalendar from "./ActivitiesCalendar"

describe("<ActivitiesCalendar />", () => {
  beforeEach(() => {
    cy.viewport(800, 600)
  })

  it("renders empty calendar correctly", () => {
    const today = dayjs()

    cy.mount(
      <ActivitiesCalendar
        date={today.startOf("month")}
        setDate={() => {}}
        activities={[]}
      />,
    )

    cy.contains(today.format("MMMM"))
    cy.contains(today.format("YYYY"))

    const calendar = cy.get("div#calendar")
    calendar.should("exist")

    const start = today.startOf("month").startOf("isoWeek")
    const days = calendar.children()
    days.should("have.length", 5 * 7)

    days
      .first()
      .should(
        "have.attr",
        "data-cy",
        `calendar-day-${start.format("YYYY-MM-DD")}`,
      )

    const end = today.endOf("month").endOf("isoWeek")
    cy.get("div#calendar")
      .children()
      .last()
      .should(
        "have.attr",
        "data-cy",
        `calendar-day-${end.format("YYYY-MM-DD")}`,
      )
  })

  it("changes month forward and backward correctly", () => {
    const startOfMonth = dayjs().startOf("month").subtract(1, "month")
    const setDateSpy = cy.spy().as("setDateSpy")
    cy.mount(
      <ActivitiesCalendar
        date={startOfMonth}
        setDate={setDateSpy}
        activities={[]}
      />,
    )

    cy.get("[data-cy=calendar-back]").click()
    cy.get("@setDateSpy").should(
      "have.been.calledWith",
      startOfMonth.subtract(1, "month"),
    )
    cy.get("[data-cy=calendar-forward]").click()
    cy.get("@setDateSpy").should(
      "have.been.calledWith",
      startOfMonth.add(1, "month"),
    )
  })
})

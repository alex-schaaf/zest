import dayjs from "dayjs"
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
      />
    )

    cy.contains(today.format("MMMM"))
    cy.contains(today.format("YYYY"))

    const calendar = cy.get("div#calendar")
    calendar.should("exist")

    const start = today.startOf("month").subtract(today.isoWeekday(), "days")

    const days = calendar.children()
    days.should("have.length", 5 * 7)

    days
      .first()
      .should(
        "have.attr",
        "data-cy",
        `calendar-day-${start.format("YYYY-MM-DD")}`
      )

    const end = today.endOf("month").add(7 - today.isoWeekday(), "days")
    cy.get("div#calendar")
      .children()
      .last()
      .should(
        "have.attr",
        "data-cy",
        `calendar-day-${end.format("YYYY-MM-DD")}`
      )
  })
})

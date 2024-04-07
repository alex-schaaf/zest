import Button from "./Button"

describe("<Button />", () => {
  it("renders secondary button by default", () => {
    cy.mount(<Button>Click me!</Button>)

    cy.get("button").should("contain.text", "Click me!")

    cy.get("button")
      .then(($el) => $el[0].className)
      .should("match", /bg-gray/)
  })

  it("renders primary button intent", () => {
    cy.mount(<Button intent={"primary"}>Primary Button</Button>)

    const btn = cy.get("button")
    btn.should("contain.text", "Primary Button")

    btn.then(($el) => $el[0].className).should("match", /bg-primary/)
    btn.then(($el) => $el[0].className).should("match", /text-white/)
  })

  it("renders loading state", () => {
    cy.mount(<Button isLoading={true}>Button</Button>)

    const btn = cy.get("button")

    btn.get("span").should("contain.text", "Button")
    btn
      .get("span")
      .then(($el) => $el[0].className)
      .should("match", /invisible/)

    btn.get("svg").should("exist")
  })
})

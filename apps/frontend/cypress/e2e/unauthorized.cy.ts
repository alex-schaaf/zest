describe("signin page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("sucessfully loads", () => {
    cy.contains("Sign in to your account").should("exist")

    const emailInput = cy.get("input[name=email]")
    emailInput.should("exist")
    emailInput.should("be.empty")

    const passwordInput = cy.get("input[name=password]")
    passwordInput.should("exist")
    passwordInput.should("be.empty")

    const signInBtn = cy.get("button[name=signIn]")
    signInBtn.should("exist")
    signInBtn.should("be.disabled")
  })

  it("signin btn becomes active when email and password entered", () => {
    cy.get("input[name=email]").type("email@example.com")

    cy.get("button[name=signIn]").should("be.disabled")

    cy.get("input[name=password]").type("invalidPassword")
    cy.get("button[name=signIn]").should("not.be.disabled")
  })

  it("signin with invalid credentials shows error", () => {
    cy.get("input[name=email]").type("email@example.com")
    cy.get("input[name=password]").type("invalidPassword")

    cy.get("button[name=signIn]").click()

    cy.contains("Error: Invalid credentials").should("exist")
  })
})

export {}

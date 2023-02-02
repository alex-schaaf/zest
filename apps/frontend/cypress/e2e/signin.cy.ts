describe("signin page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.intercept("GET", "/api/v1/users", { statusCode: 401 }).as("getUser")
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
    cy.wait("@getUser")
    const email = cy.get("input[name=email]")
    email.type("email@example.com")

    let btn = cy.get("button[name=signIn]")
    btn.should("be.disabled")

    const password = cy.get("input[name=password]")
    password.type("invalidPassword")

    btn.should("not.be.disabled")
  })

  it("signin with invalid credentials shows error", () => {
    cy.wait("@getUser")

    cy.get("input[name=email]").type("email@example.com")
    cy.get("input[name=password]").type("invalidPassword")

    cy.get("button[name=signIn]").click()

    cy.contains("Invalid credentials").should("exist")
  })
})

export {}

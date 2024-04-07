describe("authorized app", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/users", {
      statusCode: 200,
      body: { id: 1, email: "email@example.com", settingsId: 1 },
    })
    cy.intercept("GET", "/api/v1/users/*/settings/*", {
      statusCode: 200,
      body: { id: 1 },
    })
    cy.intercept("GET", "/api/v1/users/*/activities", { statusCode: 404 })
    cy.visit("/")
  })

  it("sucessfully loads navbar", () => {
    cy.get("a[href='/']").should("exist")
    cy.get("a[href='/activities']").should("exist")
    cy.get("a[href='/settings']").should("exist")
  })
})

export {}

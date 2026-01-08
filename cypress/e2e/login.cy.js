it("başarılı login yapınca success sayfasına gider", () => {
  cy.visit("http://localhost:5173/");

  cy.get('input[placeholder="email"]').type("test@test.com");
  cy.get('input[placeholder="password"]').type("abc123");
  cy.get('input[type="checkbox"]').check();
  
  cy.get('button[type="submit"]').should("not.be.disabled").click();

  cy.url().should("include", "/success");
  cy.contains("Success").should("exist");
});

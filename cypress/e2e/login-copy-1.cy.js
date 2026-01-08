describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("başarılı login yapınca success sayfasına gider", () => {
    cy.get('input[placeholder="email"]').type("test@test.com");
    cy.get('input[placeholder="password"]').type("abc123");
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
  });

  it("hatalı durumlarda hata mesajları çıkar ve buton disabled kalır", () => {

    // Case 1: email yanlış
    cy.get('input[placeholder="email"]').clear().type("yanlis");
    cy.contains("Geçerli bir email giriniz").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");

    // Case 2: email + password yanlış
    cy.get('input[placeholder="password"]').type("x");
    cy.contains("Şifre en az 6 karakter olmalı ve sayı içermeli").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");

    // Case 3: email + password doğru ama terms yok
    cy.get('input[placeholder="email"]').clear().type("test@test.com");
    cy.get('input[placeholder="password"]').clear().type("abc123");
    cy.get('button[type="submit"]').should("be.disabled");
  });
});

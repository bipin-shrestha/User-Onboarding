describe("These are simple tests", () => {
    it("Renders our page to the screen",() => {
        cy.visit("http://localhost:3000/");
    });

    it("Get name input value",() => {
        cy.get('input[name="name"]')
          .type("Bipin Shrestha")
          .should('have.value',"Bipin Shrestha");  
    });

    it("Get the Email Value", () =>{
        cy.get('input[name="email"]')
          .type("iambpn.shrestha@gmail.com");
    });

    it("Get the password value", () =>{
        cy.get('input[name="password"]')
          .type('12345678');
    })

    it("Check the term box", () => {
        cy.get('[type="checkbox"]').check();
    })

    it("Should submit the form", () =>{
        cy.get('form').submit();
    });

    it("should check for the validation", () => {
        cy.get('button[type="submit"]')
          .should("be.disabled");

        cy.get('input[name="name"]')
          .type("Brizen Rai");
        
        cy.get('input[name="email"]')
          .type("normad_17@hotmail.com");

        cy.get('input[name="password"]')
          .type('asdfgh');
          
        cy.get('[type="checkbox"]')
          .check();
          
        cy.get('button[type="submit"]')
          .should("not.be.disabled");
    });
});
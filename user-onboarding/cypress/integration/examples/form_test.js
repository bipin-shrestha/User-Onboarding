describe("Just Sample Tests", () =>{
   beforeEach(() =>{
       crypto.visit("http://localhost:3000/")
   });
   
    it("should open project", () =>{
        cy.url()
          .should()
    });
});    
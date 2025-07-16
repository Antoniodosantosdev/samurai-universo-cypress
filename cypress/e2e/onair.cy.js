describe('Teste de Login', () => {
  beforeEach(() => {
    // uma simples marcação
    cy.visit('/');
  });
    it('Webapp deve estar online', function(){
        cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
    })
    

});

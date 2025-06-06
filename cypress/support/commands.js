// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "fillName",
  (name) => {
    cy.get('input[name="name"]', { log: false }).type(name, { log: false });
  },
  { prevSubject: false, log: false }
);

Cypress.Commands.add("postUser", (user) => {
  cy.task("removeUser", user.email);

  cy.request("POST", "http://localhost:3333/users", user).then((response) => {
    expect(response.status).to.eq(200);
  });


});

Cypress.Commands.add('recoveryPass', (email) => {
  cy.request("POST", "http://localhost:3333/password/forgot", { email: email }).then((response) => {
    expect(response.status).to.eq(204);

    cy.task('findToken', email)
      .then((token) => {
        // console.log(token)
        Cypress.env('recoveryToken', token)
      });
  });
});

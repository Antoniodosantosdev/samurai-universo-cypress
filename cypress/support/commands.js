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

import moment from "moment";

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



Cypress.Commands.add("createAppointment", (hour) => {
  let now = new Date();
  now.setDate(now.getDate() + 1); // Agendamento para o dia seguinte

  const day = now.getDate();
  Cypress.env("appointmentDay", day); // <- Corrigido aqui

  const date = moment(now).format("YYYY-MM-DD " + hour + ":00");

  const payload = {
    provider_id: Cypress.env("providerId"),
    date: date,
  };

  return cy
    .request({
      method: "POST",
      url: "http://localhost:3333/appointments",
      body: payload,
      headers: {
        Authorization: `Bearer ${Cypress.env("apiToken")}`,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Agendamento criado para o dia ${day} às 14:00`);
    });
});

Cypress.Commands.add("setProviderId", (providerEmail) => {
  cy.request({
    method: "GET",
    url: "http://localhost:3333/providers",
    headers: {
      Authorization: `Bearer ${Cypress.env("apiToken")}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const providerList = response.body;
    providerList.forEach((provider) => {
      if (provider.email === providerEmail) {
        Cypress.env("providerId", provider.id);
        cy.log(`Provider ID set to: ${provider.id}`);
      }
    });
  });
});

Cypress.Commands.add("apiLogin", (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  return cy
    .request({
      method: "POST",
      url: "http://localhost:3333/sessions",
      body: payload,
    })
    .then((response) => {
      expect(response.status).to.eq(200);

      Cypress.env("apiToken", response.body.token);
    });
});



describe("Dashboard", () => {
  context("quando o cliente faz um agendamento no app mobile", () => {
    const data = {
      customer: {
        name: "Nikki Sixx",
        email: "sixx@motleycrue.com",
        password: "pwd123",
        is_provider: false,
      },
      provider: {
        name: "Ramon Valdes",
        email: "ramon@televisa.com",
        password: "pwd123",
        is_provider: true,
      },
    };
    before(() => {
      cy.postUser(data.provider);
      cy.postUser(data.customer);

      cy.apiLogin(data.customer).then(() => {
        const token = Cypress.env("apiToken");
        cy.log(`Conseguimos pegar o token: ${token}`);

        cy.setProviderId(data.provider.email).then(() => {

        })
      });
    });
    it("o mesmo deve ser exibido no dashboard", () => {
      cy.log('O Id do ramon é ' + Cypress.env('providerId'));
    });
  });
});

Cypress.Commands.add('setProviderId', (providerEmail) => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/providers',
    headers: {
      Authorization: `Bearer ${Cypress.env('apiToken')}`
    }

  }).then((response) => {
    expect(response.status).to.eq(200);
    const providerList = response.body;
    providerList.forEach((provider) => {
      if (provider.email === providerEmail) {
        Cypress.env('providerId', provider.id);
        cy.log(`Provider ID set to: ${provider.id}`);
      }
    })
  })
})

Cypress.Commands.add("apiLogin", (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  return cy.request({
    method: "POST",
    url: "http://localhost:3333/sessions",
    body: payload,
  }).then((response) => {
    expect(response.status).to.eq(200);

    Cypress.env("apiToken", response.body.token);
  });
});

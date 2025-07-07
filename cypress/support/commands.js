import moment from "moment";
import loginPage from "../pages/login";
import dashPage from "../pages/dash";

const apiServer = "http://localhost:3333";

Cypress.Commands.add("uiLogin", (user) => {
  loginPage.go();
  loginPage.fillForm(user);
  loginPage.submit();
  dashPage.header.userLoggedIn(user.name);
});

Cypress.Commands.add("postUser", (user) => {
  cy.task("removeUser", user.email);
  cy.request("POST", `${apiServer}/users`, user).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("recoveryPass", (email) => {
  cy.request("POST", `${apiServer}/password/forgot`, { email }).then(
    (response) => {
      expect(response.status).to.eq(204);

      cy.task("findToken", email).then((token) => {
        Cypress.env("recoveryToken", token);
      });
    }
  );
});

Cypress.Commands.add("createAppointment", (hour) => {
  let now = new Date();
  now.setDate(now.getDate() + 1);

  Cypress.env('appointmentDate', now);

  const date = moment(now).format(`YYYY-MM-DD ${hour}:00`);

  const payload = {
    provider_id: Cypress.env("providerId"),
    date: date
  };
  
  cy.log(payload);

  cy.request({
    method: "POST",
    url: `${apiServer}/appointments`,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("apiToken")}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("setProviderId", (providerEmail) => {
  cy.request({
    method: "GET",
    url: `${apiServer}/providers`,
    headers: {
      Authorization: `Bearer ${Cypress.env("apiToken")}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);

    const provider = response.body.find((p) => p.email === providerEmail);
    if (provider) {
      Cypress.env("providerId", provider.id);
      cy.log(`Provider ID set to: ${provider.id}`);
    } else {
      throw new Error(`Provider with email ${providerEmail} not found`);
    }
  });
});

Cypress.Commands.add("apiLogin", (user, setLocalStorage = false) => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  cy.request("POST", `${apiServer}/sessions`, payload).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("apiToken", response.body.token);

    if (setLocalStorage) {
      const { token, user } = response.body;

      cy.visit("/dashboard", {
        onBeforeLoad(win) {
          win.localStorage.setItem("@Samurai:token", token);
          win.localStorage.setItem("@Samurai:user", JSON.stringify(user));
        },
      });
    }
  });

  if (!setLocalStorage) {
    cy.log("API login sem LocalStorage");
  }
});

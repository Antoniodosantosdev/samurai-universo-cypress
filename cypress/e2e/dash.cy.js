import loginPage from "../pages/login";
import dashPage from "../pages/dash";

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
      appointmentHour: "14:00",
    };
    before(() => {
      cy.postUser(data.provider);
      cy.postUser(data.customer);

      cy.apiLogin(data.customer).then(() => {
        const token = Cypress.env("apiToken");

        cy.setProviderId(data.provider.email).then(() => {});
        cy.createAppointment(data.appointmentHour);
      });
    });
    it("o mesmo deve ser exibido no dashboard", () => {
      loginPage.go();
      loginPage.fillForm(data.provider);
      loginPage.submit();

      dashPage.calendarShouldBeVisible();

      const day = Cypress.env("appointmentDay");
      dashPage.selectDay(day);

      dashPage.appointmentShouldBe(data.customer, data.appointmentHour);
    });
  });
});


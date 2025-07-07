import dashPage from "../pages/dash";
import { customer, provider, appointment } from "../support/factories/dash";

describe("dashboard", () => {
  
  context("quando o cliente faz um agendamento no app mobile", () => {
    before(() => {
      cy.postUser(provider);
      cy.postUser(customer);

      cy.apiLogin(customer).then(() => {
        const token = Cypress.env("apiToken");

        cy.setProviderId(provider.email);
        cy.createAppointment(appointment.hour);
      });
    });

    it("o mesmo deve ser exibido no dashboard", () => {
      const date = Cypress.env("appointmentDate");

      cy.apiLogin(provider, true);

      cy.log("Login via API + set localStorage")

      dashPage.calendarShouldBeVisible();
      dashPage.selectDay(date);
      dashPage.appointmentShouldBe(customer, appointment.hour);
    });
  });
});

 
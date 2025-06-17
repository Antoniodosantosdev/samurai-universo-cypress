import { elements } from "./elements";
import header from "../../support/components/header";

class DashPage {
  calendarShouldBeVisible() {
    cy.get(elements.calendar, { timeout: 7000 }).should("be.visible");
  }

  selectDay(day) {
    cy.get(elements.boxDay)
      .contains(new RegExp(`^${day}$`, "g"))
      .click({ force: true });
  }

  appointmentShouldBe(customer, hour){
    cy.contains('div', customer.name)
      .should('be.visible')
      .parent()
      .contains(elements.boxHour, hour)
      .should('be.visible');
  }
}

export default new DashPage();


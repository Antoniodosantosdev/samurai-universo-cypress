import { elements } from "./elements";

class Alert {
  haveText(expectedText) {
    cy.contains(elements.error, expectedText)
      .should("be.visible");
  }
}

export default new Alert();
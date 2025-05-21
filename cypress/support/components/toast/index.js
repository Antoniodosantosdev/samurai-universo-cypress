import { elements } from "./elements";

class Toast {
  ShouldHaveText(expectedText) {
    cy.get(elements.toast, { timeout: 10000 }).should("be.visible");
    cy.get(elements.toastMessage, { timeout: 10000 }).should(
      "contain.text",
      expectedText
    );
  }
}

export default new Toast();

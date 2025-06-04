import { elements } from "./elements";
class Header {
  userLoggedIn(userName) {
    cy.get(elements.fullName, { timeout: 7000 })
      .should("be.visible")
      .should("have.text", userName);
  }
}

export default new Header();

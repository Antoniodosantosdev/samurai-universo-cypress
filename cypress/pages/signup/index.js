import { elements } from "./elements";
import toast from "../../support/components/toast/index";
import alert from "../../support/components/alert";

class signupPage {
  constructor() {
    this.toast = toast;
    this.alert = alert;
  }

  go() {
    cy.visit("/signup");

    cy.contains(elements.title)
      .should('be.visible');
  }

  fillForm(user) {
    cy.get(elements.name).type(user.name);
    cy.get(elements.email).type(user.email);
    cy.get(elements.password).type(user.password);
  }

  submit() {
    cy.contains(elements.signupButton, "Cadastrar").click();
  }
}
export default new signupPage();

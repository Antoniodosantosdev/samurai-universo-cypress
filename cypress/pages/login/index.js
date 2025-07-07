import { elements } from "./elements";
import toast from "../../support/components/toast";
import alert from "../../support/components/alert";

class LoginPage {
  constructor() {
    this.toast = toast;
    this.alert = alert;
  }

  go() {
    cy.visit("/");

    
  }

  fillForm(user) {
    cy.get(elements.email).clear().type(user.email);
    cy.get(elements.password).clear().type(user.password);
  }

  submit() {
    cy.contains(elements.signIn).click();
  }
}

export default new LoginPage();

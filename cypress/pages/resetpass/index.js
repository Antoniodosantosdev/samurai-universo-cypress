import { elements } from "./elements";
import toast from "../../support/components/toast/index";
import alert from "../../support/components/alert";

class ResetPassPage {
  constructor() {
    this.toast = toast;
    this.alert = alert;
  }
  go(token) {
    cy.visit(`/reset-password?token=${token}`);
  }

  fillForm(newPass, confirmPass) {
    cy.get(elements.password).clear().type(newPass);

    cy.get(elements.password2).clear().type(confirmPass);
  }

  submit() {
    cy.contains(elements.changePassButton).click();
  }
}

export default new ResetPassPage();

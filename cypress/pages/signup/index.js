import { elements } from "./elements";
import toast from "../../support/components/toast/index";

class signupPage {
  constructor() {
    this.toast = toast;
  }

  go() {
    cy.visit("/signup");
  }

  fillForm(user) {
    cy.get(elements.name).type(user.name);
    cy.get(elements.email).type(user.email);
    cy.get(elements.password).type(user.password);
  }

  submit() {
    cy.contains(elements.signupButton, "Cadastrar").click();
  }

  alertHaveText(expectedText) {
    cy.contains(".alert-error",  expectedText).should("be.visible");
    
    
  }

  // alertInvalidEmail() {
  //   cy.contains(".alert-error", "Informe um email válido").should("be.visible");
    
    
  // }

  // alertShortPassword() {
  //   cy.contains(".alert-error", "Pelo menos 6 caracteres").should("be.visible");
  // }
  
}
export default new signupPage();


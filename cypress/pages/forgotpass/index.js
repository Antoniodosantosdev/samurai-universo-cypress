import { elements } from './elements'
import toast from '../../support/components/toast';

class ForgotPassPage {
    constructor() {
        this.toast = toast;
    }
        
    go() {
        cy.visit('/forgot-password');

        cy.contains(elements.title)
            .should('be.visible');
    }

    fillForm(email) {
        cy.get(elements.email)
            .clear()
            .type(email);
    }

    submit() {
        cy.contains('button[type=submit]', 'Recuperar')    
            .click();
        }
}

export default new ForgotPassPage();
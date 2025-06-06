import fpPage from "../pages/forgotpass";
import rpPage from "../pages/resetpass";

describe("resgate de senha", () => {
  let data;

  before(() => {
    cy.fixture("recovery").then((recovery) => {
      data = recovery;
    });
  });

  context("quando o usuário esquece a senha", () => {
    before(() => {
      cy.postUser(data);
    });
    it("deve poder resgatar por email", () => {
      fpPage.go();
      fpPage.fillForm(data.email);
      fpPage.submit();

      const message =
        "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.";

      fpPage.toast.ShouldHaveText(message);

      cy.wait(7000);
    });
  });

  context("quando o usuário solicita o resgate de senha", () => {
    before(() => {
      cy.postUser(data);
      cy.recoveryPass(data.email);
    });
    it("deve pode cadastrar uma nova senha", () => {
      const token = Cypress.env("recoveryToken");

      rpPage.go(token);
      rpPage.fillForm("abc123", "abc123");
      rpPage.submit();

      const message = "Agora você já pode logar com a sua nova senha secreta.";

      rpPage.toast.ShouldHaveText(message);
    });
  });
});

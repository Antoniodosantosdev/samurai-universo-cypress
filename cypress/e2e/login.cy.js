import loginPage from "../pages/login";
import dashPage from "../pages/dash";

describe("login", () => {
  context("Quando o usuário é muito bom", () => {
    const user = {
      name: "Robson Jassa",
      email: "jassa@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.postUser(user);
    });

    it("Deve logar com sucesso", () => {
      loginPage.go();
      loginPage.fillForm(user);
      loginPage.submit();

      dashPage.header.userLoggedIn(user.name);
    });
  });

  context("Quando o usuário é bom, mas a senha está incorreta", () => {
    let user = {
      name: "Celso Kamura",
      email: "kamura@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    beforeEach(() => {
      cy.postUser(user).then(() => {
        user.password = "abc123";
      });
      // utilizada assicronona
    });
    it("Deve notificar erro de credenciais", () => {
      // de forma procedural
      loginPage.go();
      loginPage.fillForm(user);
      loginPage.submit();

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.toast.ShouldHaveText(message);
    });
  });

  context("Quando o formato de email é inválido", () => {
    const emails = [
      "papito.com.br",
      "yahoo.com",
      "@gmail.com",
      "@",
      "papito@",
      "111",
      "&*^&^&*",
      "xpto123",
    ];

    beforeEach(() => {
      loginPage.go();
    });

    emails.forEach((email) => {
      it("não deve logar com email: " + email, () => {
        const user = { email: email, password: "pwd123" };

        loginPage.fillForm(user);
        loginPage.submit();
        loginPage.alert.haveText("Informe um email válido");
      });
    });
  });

  context("Quando não preencho nenhum dos campos", () => {
    const alertMessages = ["E-mail é obrigatório", "Senha é obrigatória"];

    beforeEach(() => {
      loginPage.go();
      loginPage.submit();
    });

    alertMessages.forEach((alertMessage) => {
      it(`Deve exibir: ${alertMessage}`, () => {
        loginPage.alert.haveText(alertMessage);
      });
    });
  });
});

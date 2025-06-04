import signupPage from "../pages/signup/index.js";

describe("Cadastro", () => {
  let success;
  let email_dup;
  let email_inv;
  let short_password;

  before(() => {
    cy.fixture("signup").then((signup) => {
      success = signup.success;
      email_dup = signup.email_dup;
      email_inv = signup.email_inv;
      short_password = signup.short_password;
    });
  });

  context("Quando o usuário é novato", () => {
    before(() => {
      cy.task("removeUser", success.email);
    });

    it("Deve cadastrar com sucesso", () => {
      signupPage.go();
      signupPage.fillForm(success);
      signupPage.submit();
      signupPage.toast.ShouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o e-mail já existe", () => {
    before(() => {
      cy.postUser(email_dup);
    });

    it("Não deve cadastrar o usuário", () => {
      signupPage.go();
      signupPage.fillForm(email_dup); // << aqui também
      signupPage.submit();
      signupPage.toast.ShouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("Quando o email é incorreto", () => {
    it("Deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.fillForm(email_inv);
      signupPage.submit();
      signupPage.alert.haveText("Informe um email válido");
    });
  });

context("Quando a senha é muito curta", () => {
  const passwords = ["1", "2a", "ab3", "abc4", "ab#d5"];

  beforeEach(() => {
    signupPage.go();
  });

  passwords.forEach((p) => {
    it(`Não deve cadastrar com a senha: ${p}`, () => {
      const user = { ...short_password, password: p };

      signupPage.fillForm(user);
      signupPage.submit();
    });
  });
});

  context("Quando não preencho nenhum dos campos", () => {
    const alertMessages = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória",
    ];

    beforeEach(() => {
      signupPage.go();
      signupPage.submit();
    });

    alertMessages.forEach((alert) => {
      it(`Deve exibir: ${alert}`, () => {
        signupPage.alert.haveText(alert);
      });
    });
  });
});

afterEach(() => {});

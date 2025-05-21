import signupPage from "../pages/signup/index.js";

describe("Cadastro", () => {
  const user = {
    name: "Fernando Papito",
    email: "papito@samuraibs.com",
    password: "pwd123",
  };

  context("Quando o usuário é novato", () => {
    before(() => {
      cy.task("removeUser", user.email);
    });

    it("Deve cadastrar com sucesso", () => {
      signupPage.go();
      signupPage.fillForm(user); // << aqui
      signupPage.submit();
      signupPage.toast.ShouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o e-mail já existe", () => {
    const user = {
      name: "Antonio Carlos",
      email: "antonio@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email);

      cy.request("POST", "http://localhost:3333/users", user).then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
    });

    it("Não deve cadastrar o usuário", () => {
      signupPage.go();
      signupPage.fillForm(user); // << aqui também
      signupPage.submit();
      signupPage.toast.ShouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("Quando o email é incorreto", () => {
    const user = {
      name: "Artur Enzo",
      email: "enzo.gmail.com",
      password: "pwd123",
    };
    it("Deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.fillForm(user);
      signupPage.submit();
      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("Quando a senha é muito curta", () => {
    const passwords = ["1", "2a", "ab3", "abc4", "ab#d5"];

    beforeEach(() => {
      signupPage.go();
    });

    passwords.forEach((p) => {
      it(`Não deve cadastrar com a senha: ${p}`, () => {
        const user = {
          name: "Jason Lima",
          email: "jason@gmail.com",
          password: p,
        };

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
      signupPage.alertHaveText(alert);
    });
  });
});

});

afterEach(() => {});

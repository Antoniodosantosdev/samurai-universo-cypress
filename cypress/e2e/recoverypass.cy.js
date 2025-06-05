import fpPage from '../pages/forgotpass'

describe('resgate de senha', () => {
    let data;
    
    before(() => {
        cy.fixture('recovery').then((recovery) => {
            data = recovery;
        })
    })

    context('quando o usuário esquece a senha', () => {

        before(() => {
            cy.postUser(data)
        })
        it('deve poder resgatar por email', () => {
            fpPage.go()
            fpPage.fillorm(data.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            fpPage.toast.ShouldHaveText(message)

            cy.wait(7000)
        })
    })
})


describe("Create", () => {

    //antes de fazer todos teste executa
    // before(() => {
    //})

    beforeEach(() => {
        cy.visit("/");

    })

    //executar antes de cada teste
    afterEach(() => { })

    it("logar na conta", async () => {
        cy.contains("Login")
    })
    it("login conta valida de teste", () => {
        const email = "teste@gmail.com"
        const password = "123456"
        cy.get("#testpassword").type(password)
        cy.get("#testemail").type(email)
        cy.get("#buttonLogin").click()
        cy.contains("Login feito com sucesso")

    })
    it("login conta com error", () => {
        const email = "teste123@gmail.com"
        const password = "123456"
        cy.get("#testpassword").type(password)
        cy.get("#testemail").type(email)
        cy.get("#buttonLogin").click()
        cy.contains("Erro ao fazer login! Verifique email ou senha.")

    })
    it("ir para pagina de cadastro", () => {
        cy.contains("Criar conta").click()
        cy.url().should("contain", "/create")
    })

})
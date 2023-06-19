describe("Create", () => {

    //antes de fazer todos teste executa
    // before(() => {
    //})




    beforeEach(() => {
        cy.visit("/create");

    })

    //executar antes de cada teste
    afterEach(() => { })

    it("create acout", async () => {
        cy.contains("Cradastrar usúario")
    })
    it("ciar conta valida de teste", () => {
        const email = "teste@gmail.com"
        const name = "teste"
        const password = "123456"
        cy.get(".testname").type(name)
        cy.get(".testemail").type(email)
        cy.get(".testpassword").type(password)
        cy.contains("Cadastrar").click()
        cy.contains("Criado com sucesso!")

    })
    it("criar conta com error", () => {
        const email = "teste@gmail.com"
        const name = "teste"
        const password = "123456"
        cy.get(".testname").type(name)
        cy.get(".testemail").type(email)
        cy.get(".testpassword").type(password)
        cy.contains("Cadastrar").click()
        cy.contains("Email ja pode ter sido ultilizado!")
        cy.contains("Erro ao criar!")
    })
    it("teste de voltar para o login", () => {
        cy.contains("Voltar").click()
        cy.url().should("contain", "/")
    })

})

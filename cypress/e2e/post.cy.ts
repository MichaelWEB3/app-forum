

describe("Create", () => {
    it("login conta valida de teste", () => {
        cy.visit("/");
        const email = "teste@gmail.com"
        const password = "123456"
        cy.get("#testpassword").type(password)
        cy.get("#testemail").type(email)
        cy.get("#buttonLogin").click()
        cy.contains("Login feito com sucesso")
        cy.url().should("contain", "/feed")

    })
    it("ver se esta no feed", async () => {
        cy.contains("Faça uma pergunta no fórum sobre Discussão geral")
    })
    it("criar uma postagem", () => {
        const title = "title teste" 
        const subscribe = "subscribe teste"
        cy.get("#title").type(title)
        cy.get("#describe").type(subscribe)
        cy.get("#buttonEnvoarPost").click()
        cy.contains("Postado com sucesso")

    })

})
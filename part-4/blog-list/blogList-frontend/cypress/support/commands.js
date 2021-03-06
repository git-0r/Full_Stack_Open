// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
    // console.log({ username, password })
    cy.request("POST", "http://localhost:3001/api/login", { username, password })
        .then(({ body }) => {
            localStorage.setItem("loggedBlogappUser", JSON.stringify(body))
            cy.visit("http://localhost:3000")
        })
})

// Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
//     // window.alert(JSON.parse(localStorage.getItem("loggedBlogappUser")).token)
//     // window.alert(author)
//     cy.request({
//         method: "POST",
//         url: "http://localhost:3001/api/blogs",
//         headers: {
//             Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`
//         },
//         body: { title, author, url, likes }
//     }, { title, author, url, likes })
//         .then(({ body }) => {
//             window.alert(body)
//         })
// })
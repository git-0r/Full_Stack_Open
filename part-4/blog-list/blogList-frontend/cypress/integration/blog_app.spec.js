
describe("Blog app", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset")

        const user = {
            name: "rainbow",
            username: "rain",
            password: "rainbowrain"
        }

        cy.request("POST", "http://localhost:3001/api/users", user)

        cy.visit("http://localhost:3000")
    })

    it("login form is shown", function () {
        cy.contains("Log in to application")
        // cy.contains("")
    })

    describe("Login", function () {
        it("succeeds with correct credetials", function () {
            cy.get("#username").type("rain")
            cy.get("#password").type("rainbowrain")
            cy.get("#login-button").click()
            cy.contains("rainbow logged in")

        })
        it("fails with incorrect credetials", function () {
            cy.get("#username").type("username")
            cy.get("#password").type("password")
            cy.get("#login-button").click()
            cy.contains("Wrong username or password")
            cy.get("#notification-fail").contains("Wrong username or password")
            cy.get("html").should("not.contain", "rainbow logged in")
        })
        it("shows red notification on unsuccessful login", function () {
            cy.get("#username").type("username")
            cy.get("#password").type("password")
            cy.get("#login-button").click()
            cy.get("#notification-fail").should("have.css", "color", "rgb(255, 0, 0)")
        })
    })

    describe("when logged in", function () {
        beforeEach(function () {
            // cy.get("#username").type("rain")
            // cy.get("#password").type("rainbowrain")
            // cy.get("#login-button").click()
            // cy.contains("rainbow logged in")
            cy.login({ username: "rain", password: "rainbowrain" })
        })

        it("a blog can be created", function () {
            cy.get("#toggle-form").click()
            cy.get("#title").type("a blog about cypress")
            cy.get("#author").type("cypress")
            cy.get("#url").type("http://randomurl.com")
            cy.get("#create-blog-button").click()
            cy.contains("a blog about cypress")
        })

        it("blogs are ordered according to likes", function () {

            cy.get("#toggle-form").click()

            for (let i = 0; i < 2; i++) {
                cy.get("#title").type(`a blog about cypress${i}`)
                cy.get("#author").type(`cypress${i}`)
                cy.get("#url").type("http://randomurl.com")
                cy.get("#create-blog-button").click()
                cy.contains(`a blog about cypress${i}`)
                cy.get(".toggleContent").eq(i).click()
            }
            cy.get(".likeButton").eq(0).click()
            cy.get(".likes").eq(0).contains("1")
        })

        describe("user can", function () {
            beforeEach(function () {
                cy.get("#toggle-form").click()
                cy.get("#title").type("a blog about cypress")
                cy.get("#author").type("cypress")
                cy.get("#url").type("http://randomurl.com")
                cy.get("#create-blog-button").click()
                cy.contains("a blog about cypress")
            })

            it("like a blog", function () {
                cy.get(".toggleContent").click()
                cy.get(".likeButton").click()
                cy.get(".likes").should("contain", "1")
            })

            it("delete a blog", function () {
                cy.get(".toggleContent").click()
                cy.on("window:confirm", (str) => {
                    expect(str).to.eq("Remove blog a blog about cypress by cypress ?")
                })
                cy.get(".remove-blog").click()

            })
        })
    })
})
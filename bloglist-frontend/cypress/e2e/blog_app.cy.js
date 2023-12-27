describe('Blog app', () => {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Duong',
            username: 'Duong Hoang',
            password: '1234567'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', () => {
        cy.contains('log in')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.contains('log in').click()
            cy.get('#username').type('Duong')
            cy.get('#password').type('1234567')
            cy.contains('login').click()
            cy.contains('Duong Hoang logged in')
        })
        it('fails with wrong credentials', () => {
            cy.contains('log in').click()
            cy.get('#username').type('ABCDEF')
            cy.get('#password').type('123')
            cy.contains('login').click()
            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', () => {
        beforeEach(() => {
            cy.contains('log in').click()
            cy.get('#username').type('Duong')
            cy.get('#password').type('1234567')
            cy.contains('login').click()
        })
        it('A blog can be created', () => {
            cy.contains('new blog').click()
            cy.get('#title').type('This is Title')
            cy.get('#author').type('This is Author')
            cy.get('#url').type('This is Url')
            cy.get('#likes').type('5')
            cy.get('#create').click()
            cy.contains('This is Title This is Author')
        })
        it('User can like a blog', () => {
            cy.get('.blogInfo').first().contains('view').click()
            cy.get('.likes-count').then(($likesCount) => {
                const likesBefore = parseInt($likesCount.text().split(' ')[1]) // Extract the number from "likes X"
                // Click the "like" button to increase the like count.
                cy.get('#like-button').click()
                // Check that the like count has increased by one.
                cy.get('.blogInfo').first().contains('view').click()
                cy.get('.likes-count').should('contain', likesBefore + 1)
            })
        })
    })
})

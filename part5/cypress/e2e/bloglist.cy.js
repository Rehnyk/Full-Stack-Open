describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');

        const user = {
            name: 'Henry Jones',
            username: 'henryj',
            password: 'passHJ'
        };

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
        cy.visit('http://localhost:5173');
    });

    it('Login form is shown', function() {
        cy.contains('Login');
        cy.get('form').within(() => {
            cy.get('#username').should('exist');
            cy.get('#password').should('exist');
            cy.get('#login-button').should('exist');
        });
    });

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('henryj');
            cy.get('#password').type('passHJ');
            cy.get('#login-button').click();

            cy.contains('Blogs');
            cy.contains('Henry Jones logged in');
        });

        it('fails with wrong credentials', function() {
            cy.get('#username').type('henryj');
            cy.get('#password').type('wrong');
            cy.get('#login-button').click();

            cy.contains('Login');
            cy.get('.error')
                .should('contain', 'Username or password is wrong')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid');
        });
    });
});
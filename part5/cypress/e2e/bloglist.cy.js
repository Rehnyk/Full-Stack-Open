describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

        const user = {
            name: 'Henry Jones',
            username: 'henryj',
            password: 'passHJ'
        };

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
        cy.visit('');
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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'henryj', password: 'passHJ' });
        });

        it('a blog can be created', function() {
            cy.contains('Henry Jones logged in');
            cy.contains('New Blog').click();
            cy.get('#blog-title-field').type('Cypress Blog');
            cy.get('#blog-author-field').type('Cypress Team');
            cy.get('#blog-url-field').type('cypress-blog.com');

            cy.get('form').within(() => {
                cy.contains('Add').click();
            });

            cy.contains('Cypress Blog by Cypress Team');
        });

        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'Cypress Blog 111', author: 'Cypress Team', url: 'cypress-blog1.com' });
                cy.createBlog({ title: 'Cypress Blog 222', author: 'Cypress Team', url: 'cypress-blog2.com' });
                cy.createBlog({ title: 'Cypress Blog 333', author: 'Cypress Team', url: 'cypress-blog3.com' });
            });

            it.only('a new blog is added to the list of all blogs', function() {
                cy.contains('New Blog').click();
                cy.get('#blog-title-field').type('New test blog');
                cy.get('#blog-author-field').type('Test User');
                cy.get('#blog-url-field').type('test-blog.com');

                cy.get('form').within(() => {
                    cy.contains('Add').click();
                });

                cy.contains('New test blog by Test User');
            });
        });
    });
});
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
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
});
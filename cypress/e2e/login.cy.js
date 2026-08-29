describe('Login spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        // Sinkronisasi Cypress agar menunggu lazy-loading (Suspense) & spinner Redux selesai
        cy.get('input[placeholder="nama@email.com"]').should('be.visible');
    });

    it('should display login page correctly', () => {
        // Asserting we are on the correct login page
        cy.url().should('include', '/login');
        cy.get('input[placeholder="nama@email.com"]').should('be.visible');
        cy.get('input[placeholder="••••••••"]').should('be.visible');
        cy.get('button').contains('Masuk Sekarang').should('be.visible');
    });

    it('should show HTML5 validation message when email is empty', () => {
        cy.get('button').contains('Masuk Sekarang').click();
        cy.get('input[placeholder="nama@email.com"]')
            .invoke('prop', 'validationMessage')
            .should('not.be.empty');
    });

    it('should display alert when email and password are wrong', () => {
        cy.get('input[placeholder="nama@email.com"]').type('developer@wrong.com');
        cy.get('input[placeholder="••••••••"]').type('wrongpassword');
        cy.get('button').contains('Masuk Sekarang').click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('email or password is wrong');
        });
    });

    it('should login successfully and navigate to homepage', () => {
        // Intercept API Login to always return success token
        cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
            statusCode: 200,
            body: {
                status: 'success',
                message: 'ok',
                data: { token: 'mocked-jwt-token' }
            }
        }).as('loginRequest');

        // Intercept Auth Me to mock authenticated user session
        cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
            statusCode: 200,
            body: {
                status: 'success',
                message: 'ok',
                data: {
                    user: { id: 'user-cypress', name: 'Cypress Tester', email: 'test@cypress.com', avatar: 'https://ui-avatars.com/api/?name=Cypress+Tester' }
                }
            }
        }).as('authMeRequest');

        cy.get('input[placeholder="nama@email.com"]').type('test@cypress.com');
        cy.get('input[placeholder="••••••••"]').type('dummy123');
        cy.get('button').contains('Masuk Sekarang').click();

        // Expecting to reach the homepage and see "Semua Diskusi"
        cy.url().should('eq', 'http://localhost:5173/');
        cy.contains('Semua Diskusi').should('be.visible');
    });
});

describe('Bug Report Form', () => {
    // Run before each test: visit the bug report page
    beforeEach(() => {
        cy.visit('/bug-report');
    });

    it('1. Form renders correctly', () => {
        // Check if the form and its key fields exist
        cy.get('form').should('exist');
        cy.get('input[name="title"]').should('exist');
        cy.get('textarea[name="description"]').should('exist');
        cy.get('select[name="severity"]').should('exist');
    });

    it('2. Validation prevents empty/missing title', () => {
        // Click submit without entering a title
        cy.get('button[type="submit"]').click();
        // Expect an error message mentioning 'title' to appear
        cy.contains('title').should('exist');
    });

    it('3. Valid data is accepted and form submits', () => {
        // Fill in all fields with valid data
        cy.get('input[name="title"]').type('Sample bug');
        cy.get('textarea[name="description"]').type('Steps to reproduce...');
        cy.get('select[name="severity"]').select('High');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
            
        cy.get('[data-testid="success-message"]', { timeout: 7000 })
            .should('be.visible')
            .and('have.text', 'Bug reported!');
    });

    it('4. Displays success message on submit', () => {
        // Type a title
        cy.get('input[name="title"]').type('Bug');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
        
        // Check that the success message shows
        cy.get('[data-testid="success-message"]', { timeout: 7000 })
            .should('be.visible')
            .and('have.text', 'Bug reported!');
    });

    it('5. Shows validation error message if backend returns error', () => {
        // Submit the form without entering a title
        cy.get('button[type="submit"]').click();
        
        // Expect the error message from backend to appear
        cy.contains('The title field is required.').should('exist');
    });

    // Bonus Tests
    it('B1. Severity defaults to Medium', () => {
        // Check the default selected severity is 'medium'
        cy.get('select[name="severity"]').should('have.value', 'medium');
    });

    it('B2. Form resets after successful submission', () => {
        // Type a title
        cy.get('input[name="title"]').type('Bug');
        
        // Submit the form and wait for response
        cy.get('button[type="submit"]').click();
        
        // Assert the title input is cleared after submission
        cy.get('input[name="title"]').should('have.value', '');
    });
});
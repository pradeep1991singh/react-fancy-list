describe('react-fancy-list', function () {

    it('home page should render and search should work properly', function () {
        cy.visit('/')
        cy.contains('Explore Star War planets')
        // Get an input, type into it and verify that the value has been updated
        cy.get('.search-box')
            .type('Alder')
            .should('have.value', 'Alder')
    })
})

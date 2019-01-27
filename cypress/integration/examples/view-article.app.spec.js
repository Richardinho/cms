describe('view and article', () => {
  describe('when the user navigates to the home page', () => {

    beforeEach(() => {
      cy.server();
      cy.route({
        url: 'http://october.richardhunter.co.uk/index.php/api/articles/',
        response: {
          articles: [
            { id: 1, title: 'Hello world' },
            { id: 2, title: 'Goodbye' }
          ]
        }
      });
    });

    it('should display article summaries', () => {
      cy.visit('/');
      cy.get('.link span').eq(0).should('contain', 'Hello world');
      cy.get('.link span').eq(1).should('contain', 'Goodbye');
    });
  });
});

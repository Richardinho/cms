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

      cy.route({
        url: 'http://october.richardhunter.co.uk/index.php/api/article/*',
        response: {
          body: '# Hello world\n\nits the end of the world\n\nas we **know** it.'
        }
      });
    });

    it('should display article summaries', () => {
      cy.visit('/');
      cy.get('.link span').eq(0).should('contain', 'Hello world');
      cy.get('.link span').eq(1).should('contain', 'Goodbye');
    });

    describe('when the user clicks on the \'view article\` button', () => {
      it('should navigate to article', () => {
        cy.get('.link .button').eq(0).click();
        cy.contains('its the end of the world');
      });
    });
  });
});

describe('valid username and password', () => {
  it('should allow users to sign in on login page', () => {
    GIVEN_user_is_not_signed_in();
    AND_visits_login_page();
    WHEN_user_inputs_username_and_password();
    AND_clicks_submit();
    THEN_they_should_be_redirected_to_home_page();
  });

  it('should redirect to login page if user who is not signed in navigates to a page', () => {
    GIVEN_user_is_not_signed_in();
    WHEN_user_visits_article_page();
    THEN_they_should_be_redirected_to_login_page();
    WHEN_user_inputs_username_and_password();
    AND_clicks_submit();
    THEN_they_should_be_redirected_to_article_page();
  });

  beforeEach(() => {
    cy.server();

    cy.route({
      url: '**/index.php/api/login',
      method: 'POST',
      response: {
        jwt_token: 'mock-token',
      },
    });

    cy.route({
      url: '**/index.php/api/articles/',
      response: {
        articles: [
          { id: 1, title: 'Hello world' },
          { id: 2, title: 'Goodbye' }
        ]
      }
    });

    cy.route({
      url: '**/index.php/api/article/*',
      response: {
        body: '# Hello world\n\nits the end of the world\n\nas we **know** it.'
      }
    });
  });
});

function AND_visits_login_page() {
  cy.visit('/login');
}

function WHEN_user_visits_home_page() {
  cy.visit('/home');
}

function WHEN_user_visits_article_page() {
  cy.visit('/edit-article/11');
}

function THEN_they_should_be_redirected_to_article_page() {
  cy.get('.bar').should('contain', 'bar');
}

function THEN_they_should_be_redirected_to_login_page() {
  cy.get('.username');
}

function WHEN_user_inputs_username_and_password() {
  cy.get('.username').type('some_username');
  cy.get('.password').type('some_password');
}

function AND_clicks_submit() {
  cy.get('#login-button').click();
}

function GIVEN_user_is_not_signed_in() {
  //  probably not necessary
  window.localStorage.removeItem('jwt_token');
}

function THEN_they_should_be_redirected_to_home_page() {
  cy.get('#foo').should('contain', 'This is foo');
}

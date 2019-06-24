# 09 Delete an article
As a user, I want to be able to delete an article that I'm currently viewing

**GIVEN** the user is on a view article page
**WHEN** they click on a delete button
**THEN** a confirm modal should pop up asking if they are sure that they want to delete the article

**GIVEN** a confirm delete modal is being displayed
**WHEN** the user clicks *yes*
**THEN** the article should be deleted
**AND** the pop up will disappear
**AND** the page will redirected back to the home page

**GIVEN** a confirm delete modal is being displayed
**WHEN** the user clicks *no* 
**THEN** the pop up will disappear

**GIVEN** the user has clicked *yes* on the confirm modal
**WHEN** a 401 Unauthorized returns from the server
**THEN** the user should be redirected to the login page
**AND** after they login
**THEN** they should be redirected back to the article page

**GIVEN** the user has clicked *yes* on the confirm modal
**WHEN** a 404 article not found returns from the server
**THEN** a message telling them that the article was not found should be shown

**GIVEN** the user has clicked *yes* on the confirm modal
**WHEN** no status code is returned, indicating a network error
**THEN** a message telling them that there was a network error should be shown

**GIVEN** the user has clicked *yes* on the confirm modal
**WHEN** a server error returns
**THEN** a message telling them that there was an error on the server should be shown



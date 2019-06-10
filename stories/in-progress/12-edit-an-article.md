# 12. As a user, I want to be able to edit an article

The user should be able to edit and save articles

* **GIVEN** the user is viewing an article
* **WHEN** they click on the 'edit article' button
* **THEN** the edit article page should open (split pane)

* **GIVEN** the user is on the edit article page
* **AND** they have edited the article
* **WHEN** they click the 'save' button
* **THEN** the article should be saved to the server
* **AND** a message should be displayed telling the user that they have saved the article

* **GIVEN** the user is on the edit article page
* **AND** they have edited the article
* **WHEN** they attempt to leave the page
* **THEN** a confirm dialog should be displayed warning the user that they have unsaved changes which will be lost if they continue with the navigation

## Error Handling
* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** the user is not logged in
* **THEN** the user should be redirected to the login page
* **WHEN** the user logs in successfully
* **THEN** the user will be redirected back to the edit article page

* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** there is a server failure
* **THEN** a message should be shown to the user telling them that a server error occurred and they should try again later.
* **AND** a retry button should be provided

* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** there is an error on the network
* **THEN** a message should be shown to the user telling them to check their network connection
* **AND** a retry button should be provided

* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** the article does not exist
* **THEN** a message should be shown to the user telling them that the article does not exist
* **AND** a link back to the home page should be provided



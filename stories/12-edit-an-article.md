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

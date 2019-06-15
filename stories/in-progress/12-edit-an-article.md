# 12. As a user, I want to be able to edit an article

## The user should be able to navigate to the editor page
* **GIVEN** the user is viewing an article
* **WHEN** they click on the *edit article* button
* **THEN** the edit article page should open (split pane)
## A button for saving changes should appear when there are unsaved changes
* **GIVEN** the use is on the edit an article page
* **WHEN** they make changes in the edit pane
* **THEN** a *save* button should appear
## The user should be able to save changes
* **GIVEN** the user is on the edit article page
* **AND** they have edited the article
* **WHEN** they click the *save* button
* **THEN** the article should be saved to the server
* **AND** a message should be displayed telling the user that they have saved the article
* **WHEN** four seconds have passed
* **THEN** the save button should disappear

# Error Handling

## Session Timeout
### The user should be redirected to login page if they attempt to fetch an article when their session has timed out 
* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** the user is not logged in
* **THEN** the user should be redirected to the login page
* **WHEN** the user logs in successfully
* **THEN** the user will be redirected back to the edit article page
### The user should be redirected to login page if they attempt to save when their session has timed out
* **GIVEN** the user has made changes in the editor pane
* **AND** their session has timed out
* **WHEN** the user clicks the save button
* **THEN** the user should be redirected to the login page
* **WHEN** the user logs in successfully
* **THEN** the user will be redirected back to the edit article page
* **AND** their changes should still be displayed


##  Server errors
### An error message should be displayed if there is a server error whilst an article is being fetched
* **GIVEN** the application attempts to fetch an article from the server
* **WHEN** there is a server failure
* **THEN** a message should be shown to the user telling them that a server error occurred and they should try again later.
###  An error message should be displayed if there is a server error whilst the user is trying to save an article
* **GIVEN** the user has made changes in the editor pane
* **WHEN** the user clicks the save button
* **AND** an error occurs on the server
* **THEN** an error message should be displayed explaining this to the user


##  Network connection down
### An error message should be displayed if there is a network error whilst an article is being fetched
* **GIVEN** the network connection is not working
* **WHEN** the application attempts to fetch an article from the server
* **THEN** an error message should be displayed explaining this to the user
###  An error message should be displayed if there is a network error whilst the user is trying to save an article
* **GIVEN** the user has made changes in the editor pane
* **AND** the network connection is not working
* **WHEN** the user clicks the save button
* **THEN** an error message should be displayed explaining this to the user


## Articles not existing
### An error message should be displayed if an article being fetched does not exist
* **GIVEN** an article does not exist
* **WHEN** the application attempts to fetch that article from the server
* **THEN** an error message should be displayed explaining this to the user
###  An error message should be displayed if the user is trying to save an article that does not exist
* **GIVEN** an article does not exist
* **AND** the user has made changes in the editor pane
* **WHEN** the user clicks the save button
* **THEN** an error message should be displayed explaining this to the user

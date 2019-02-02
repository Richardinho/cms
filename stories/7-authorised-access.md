# 7. As an administrator,  I want to prevent unauthorised access to the app and to the API

Unauthorised users should not be able to access any part of the CMS, apart from the login page.
Unauthorised users should not be able to access the API

Users will be required to submit a username and password in order to become authorised

Account management is not in scope here. The database will contain a single user (myself!) and there
will be no way for this to be changed from within the application.

Changes to the API should be made first.

## API Acceptance Criteria

### Authorised users accessing the API
* **GIVEN** a user is authorised 
* **WHEN** they make an HTTP request to the API
* **THEN** the  request should be successful

### Unauthorised users accessing the API
* **GIVEN** a user is unauthorised 
* **WHEN** they make an HTTP request to the API
* **THEN** the  request should NOT be successful

## Technical Considerations




## CMS Acceptance Criteria


### Authorised users navigating to a page
* **GIVEN** a user is authorised
* **WHEN** they attempt to navigate to a page on the app
* **THEN** they should navigate to the requested page


### Authorised users navigating to login page
* **GIVEN** a user is authorised
* **WHEN** they navigate to the login page
* **THEN** they should see a message: 'You are already logged in'


### Unauthorised users navigating to a page with correct username/password
* **GIVEN** a user is unauthorised
* **WHEN** they attempt to navigate to a page on the app
* **THEN** they should be redirected to a sign in page
* **WHEN** they input a username and password that exists in the users database
* **THEN** they should be designated as authorised users
  * **AND** they should be redirected to the originally requested page


### Unauthorised users navigating to a page with incorrect username/password
* **GIVEN** a user is unauthorised
* **WHEN** they attempt to navigate to a page on the app
* **THEN** they should be redirected to a sign in page
* **WHEN** they input a username and password that does NOT exist in the users database
* **THEN** they should see an error message: 'User not found'


### Unauthorised users navigating to login page with correct username/password
* **GIVEN** a user is unauthorised
* **WHEN** they navigate directly to the login page 
  * **AND** they input a username and password that exists in the users database
* **THEN** they should be designated as authorised users
  * **AND** they should be redirected to the home page


### Unauthorised users navigating to login page with incorrect username/password
* **GIVEN** a user is unauthorised
* **WHEN** they navigate directly to the login page 
  * **AND** they input a username and password that does NOT exist in the users database
* **THEN** they should see an error message: 'User not found'

#### Definitions
* authorised user: user has a way of identifying themselves to application as being authorised
* unauthorised user: user does NOT have a way of identifying themselves to application as being authorised



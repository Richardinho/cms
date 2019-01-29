# As an adminstrator I want to prevent unauthorised access to the app

Unauthorised users should not be able to access any part of the CMS.
They should also be restricted from accessing parts of the API e.g. metadata and from changing data. Data that is publicly accessible through the website is also accessible without authorisation via the API.

Authorised users should have a username and password key. 
Authentication will be carried out using Json Web Tokens.
Authorised users will have to sign in using their username and password in order to get a JWT.


Questions: 
Whilst the most important thing is to secure access to the API, do we also want to secure access to the UI code? (Given that without data there is no security risk)

Is account management in scope? (or do we just assume one user - me!)

Should I restrict multiple log in attempts by a user within a certain time frame?

## Acceptance Criteria

* GIVEN a user is authorised (todo: define authorised)
* WHEN they attempt to navigate to a page on the app
* THEN they should navigate to the requested page


* GIVEN a user is authorised (todo: define authorised)
* WHEN they navigate to the login page
* THEN they should see a message: 'You are already logged in'


* GIVEN a user is unauthorised (todo: define unauthorised)
* WHEN they attempt to navigate to a page on the app
* THEN they should be redirected to a sign in page
* WHEN they input a username and password that exists in the users database
* THEN they should be designated as authorised users
* AND they should be redirected to the originally requested page


* GIVEN a user is unauthorised (todo: define unauthorised)
* WHEN they attempt to navigate to a page on the app
* THEN they should be redirected to a sign in page
* WHEN they input a username and password that does NOT exist in the users database
* THEN they should see an error message: 'User not found'


* GIVEN a user is unauthorised (todo: define unauthorised)
* WHEN they navigate directly to the login page 
* AND they input a username and password that exists in the users database
* THEN they should be designated as authorised users
* AND they should be redirected to the home page


* GIVEN a user is unauthorised (todo: define unauthorised)
* WHEN they navigate directly to the login page 
* AND they input a username and password that does NOT exist in the users database
* THEN they should see an error message: 'User not found'



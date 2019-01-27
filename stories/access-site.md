# Prevent unathorised access to site

GIVEN the use is not logged in
WHEN they attempt to access the site
THEN they should be challenged with a log-in form

GIVEN the user is on the log in form
given they are an authorised user
when they input their name and passwword
Then they should gain access to j

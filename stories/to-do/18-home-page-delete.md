## On the home page list of links, there will be a delete button against each article

**GIVEN** the user is on the home page
**WHEN** they click on a delete button on an article link
**THEN** a confirm modal should pop up asking if they are sure that they want to delete the article

**GIVEN** a confirm delete modal is being displayed
**WHEN** the user clicks yes
**THEN** the article will be deleted
**AND** the link will no longer be shown
**AND** the pop up will disappear

**GIVEN** a confirm delete modal is being displayed
**WHEN** the user clicks no 
**THEN** the pop up will disappear


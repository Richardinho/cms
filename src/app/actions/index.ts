import { createAction, props } from '@ngrx/store';
import { Article, Articles, Project } from '../model';

export const articleLinksResponse = createAction(
  '[Home Page] Article Links Response',
  props<{ articles: Articles; articleLinks: Array<any> }>()
);

export const articleFoundInCache = createAction(
  '[EditArticle Page] Article Found In Cache',
  props<{ id: string }>()
);

export const createArticleRequest = createAction('[Create Article] Request');

export const createArticleResponse = createAction(
  '[Create Article] Response',
  props<{ id: string }>()
);

export const deleteArticle = createAction(
  '[EditArticle Page] Delete Article',
  props<{ redirectUrl: string }>()
);

export const articleChanged = createAction(
  '[EditArticle Page] Article Changed',
  props<{ articlePatchData: any }>()
);

export const articleSavedResponse = createAction(
  '[EditArticle Page] Article Saved Response',
  props<{ articleJSON: any }>()
);

export const deleteArticleResponse = createAction(
  '[EditArticle Page] Delete Article Response',
  props<{ id: string }>()
);

export const articleRequest = createAction(
  '[EditArticle Page] Article Request',
  props<{ id: string | null; redirectUrl: string }>()
);

export const genericError = createAction(
  '[EditArticle Page] Generic Error',
  props<{ message: string }>()
);

export const getArticleResponse = createAction(
  '[EditArticle Page] Get Article Response',
  props<{ articleJSON: any }>()
);

export const introChanged = createAction(
  '[EditIntro Page] Intro Changed',
  props<{ body: string; saved: boolean }>()
);

export const nullAction = createAction('Null Action');

export const introFoundInCache = createAction(
  '[Intro Page] Intro Found in Cache'
);

export const introRequest = createAction('[Intro Page] Intro Request');

export const introSaved = createAction('[Intro] IntroSaved');

export const introNotSavedToServer = createAction(
  '[Intro] IntroNotSavedToServer',
  props<{ error: any }>()
);

export const logInRequest = createAction(
  '[Log In] Log In Request',
  props<{ redirectUrl: string; username: string; password: string }>()
);

export const logInResponse = createAction(
  '[Log In] Log In Response',
  props<{ redirectUrl: string; jwt_token: string }>()
);

export const logOut = createAction('[Log Out] Log Out');

export const metadataRequest = createAction(
  '[Configuration Page] Metadata Request'
);

export const metadataResponse = createAction(
  '[Configuration Page] Metadata Response',
  props<{ metadata: { github_url: string } }>()
);

export const navigateAway = createAction('[Home Page] Navigate Away');

export const navigateToEditPageRequest = createAction(
  '[ViewArticle Page] navigate to edit page'
);

export const projectsRequest = createAction('[Projects] Projects Request');

export const projectsFoundInCache = createAction(
  '[Projects] Projects Found In Cache'
);

export const projectsResponse = createAction(
  '[Projects] Projects Response',
  props<{ projects: Array<Project> }>()
);

export const editProject = createAction(
  '[Projects] EditProject',
  props<{ id: string; edit: boolean }>()
);

export const saveProject = createAction(
  '[Projects] SaveProject',
  props<{ project: Project }>()
);

export const projectSavedResponse = createAction(
  '[Projects] Project Saved Response',
  props<{ id: string }>()
);

export const deleteProject = createAction(
  '[Projects] DeleteProject',
  props<{ id: string }>()
);

export const deleteLocalProject = createAction(
  '[Projects] DeleteLocalProject',
  props<{ id: string }>()
);

export const projectDeletedResponse = createAction(
  '[Projects] Project Deleted Response',
  props<{ id: string }>()
);

// creates new project locally in store (NOT on server)
export const createProjectRequest = createAction(
  '[Projects] Project Create Request'
);

// saves the new project to the server
export const saveNewProjectRequest = createAction(
  '[Projects] Project Save New Project Request',
  props<{ project: Project }>()
);

// after response from server that project has been created. Will include new id generated
// on the server
export const createNewProjectResponse = createAction(
  '[Projects] Project Save New Project Response',
  props<{ project: any; currentId: string }>()
);

export const requestArticleLinks = createAction(
  '[Home Page] Request Article Links'
);

export const saveArticle = createAction('[EditArticle Page] Save Article');

export const saveIntro = createAction('[Intro Page] Save Intro');

export const unauthorisedResponse = createAction(
  '[EditArticle Page] Unauthorised Response',
  props<{ redirectUrl: string }>()
);

export const sessionExpired = createAction('[Authorisation] Session Expired');

export const updateMetadataRequest = createAction(
  '[Configuration Page] Update Metadata Request',
  props<{ metadata: { github_url: string } }>()
);

export const updateMetadataResponse = createAction(
  '[Configuration Page] Update Metadata Response',
  props<{ metadata: { github_url: string } }>()
);

import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
  withLatestFrom,
  mergeMap,
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';

import { of } from 'rxjs';

import {
  projectsRequest,
  projectsFoundInCache,
  projectsResponse,
  projectSavedResponse,
  saveProject,
  saveNewProjectRequest,
  deleteProject,
  projectDeletedResponse,
  createNewProjectResponse,
  genericError,
  unauthorisedResponse,
} from '../actions';

import { selectProjectsWithJWTToken } from '../selectors/project.selector';
import { AppState, Project } from '../model';
import { ProjectService } from '../services/projects.service';
import { UNAUTHORIZED } from '../status-code.constants';

const selectJWTToken = (state: AppState) => state.jwt_token;

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectService: ProjectService
  ) {}

  deleteProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProject),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
      mergeMap(([action, token]) => {
        return this.projectService.deleteProject(action.id, token).pipe(
          map(() => projectDeletedResponse({ id: action.id })),
          catchError((error) => {
            return of(genericError({ message: 'generic error occurred' }));
          })
        );
      })
    );
  });

  saveNewProject = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveNewProjectRequest),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
      switchMap(([action, token]) => {
        return this.projectService.updateProject(action.project, token).pipe(
          map((project) =>
            createNewProjectResponse({
              project,
              currentId: action?.project?.id,
            })
          ),
          catchError((error) => {
            return of(genericError({ message: 'generic error occurred' }));
          })
        );
      })
    );
  });

  saveProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveProject),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
      mergeMap(([action, token]) => {
        return this.projectService.updateProject(action.project, token).pipe(
          map(() => projectSavedResponse({ id: action.project.id })),
          catchError((error) => {
            console.log('error occurred', error);
            return of(genericError({ message: 'generic error occurred' }));
          })
        );
      })
    );
  });

  getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectsRequest),
      // if we're on this page, the token must exist.
      // Should we handle the case where it doesn't exist?
      withLatestFrom(this.store.pipe(select(selectProjectsWithJWTToken))),
      switchMap(([action, { token, projects }]) => {
        if (projects && projects.length) {
          // projects are already in store. Just signal this.
          return of(projectsFoundInCache());
        } else {
          return this.projectService.getProjects(token).pipe(
            map((projects: Array<Project>) => {
              return projectsResponse({ projects });
            }),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  return of(genericError({ message: 'Server error occured' }));
                } else {
                  return of(genericError({ message: 'Server error occured' }));
                }
              } else {
                return of(genericError({ message: 'check your network' }));
              }
            })
          );
        }
      })
    )
  );
}

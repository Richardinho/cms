import { createSelector } from '@ngrx/store';
import { AppState, UI } from '../model';

export const selectProjects = (state: AppState) => state.projects;


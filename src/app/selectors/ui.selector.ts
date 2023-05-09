import { createSelector } from '@ngrx/store';
import { AppState, UI } from '../model';

export const selectUI = (state: AppState) => state.ui;

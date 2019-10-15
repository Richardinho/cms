import { createSelector, State } from '@ngrx/store';
import { AppState, UI } from '../../model';

export const selectUI = (state: AppState) => state.ui;

export const selectSaving = createSelector(
  selectUI,
  (state: UI) => state.saving
);

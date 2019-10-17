import { createSelector, State } from '@ngrx/store';
import { AppState } from './model';

export const selectJWTToken = (state: AppState) => state.jwt_token;

export const loggedInSelector = createSelector(
  selectJWTToken,
  token => !!token
);

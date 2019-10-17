import { createReducer, on } from '@ngrx/store';
import { logInResponse, logOut } from '../actions/log-in.action';
import { sessionExpired } from '../edit-article-page/actions/session-expired.action';

const initialState = '';

const _logInReducer = createReducer(initialState,
  on(logInResponse, (state, action) => action['jwt_token']),
  on(logOut, () => ''),
  on(sessionExpired, () => ''),
);

export function logInReducer(state, action) {
  return _logInReducer(state, action);
}

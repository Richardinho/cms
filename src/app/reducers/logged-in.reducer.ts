import { createReducer, on } from '@ngrx/store';
import { sessionExpired, logInResponse, logOut } from '../actions';

const initialState = '';

const _logInReducer = createReducer(
  initialState,
  on(logInResponse, (state, action) => action['jwt_token']),
  on(logOut, () => ''),
  on(sessionExpired, () => '')
);

export function logInReducer(state: any, action: any) {
  return _logInReducer(state, action);
}

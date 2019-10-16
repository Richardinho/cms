import { createAction, props } from '@ngrx/store';

export const logInRequest = createAction(
  '[Log In] Log In Request',
  props<{ redirectUrl: string; username: string; password: string }>()
);

export const logInResponse = createAction(
  '[Log In] Log In Response',
  props<{ redirectUrl: string; jwt_token: string }>()
);

export const logOut = createAction(
  '[Log Out] Log Out'
);

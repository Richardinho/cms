import { createReducer, on } from '@ngrx/store';
import { updateMetadataResponse, metadataResponse } from '../actions';

export const initialState = {
  github_url: '',
};

export const reducer = (state: any, action: any) => {
  return action.metadata;
};

const _metadataReducer = createReducer(
  initialState,
  on(metadataResponse, reducer),
  on(updateMetadataResponse, reducer)
);

export function metadataReducer(state: any, action: any) {
  return _metadataReducer(state, action);
}

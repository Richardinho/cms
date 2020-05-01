import { createReducer, on } from '@ngrx/store';
import { metadataResponse } from '../configuration-page/actions/metadata.action';
import { updateMetadataResponse } from '../configuration-page/actions/update-metadata.action';

export const initialState = {
  github_url: '',
};

export const reducer = (state, action) => {
  return action.metadata ;
}

const _metadataReducer = createReducer(initialState,
  on(metadataResponse, reducer),
  on(updateMetadataResponse, reducer),
);

export function metadataReducer(state, action) { 
  return _metadataReducer(state, action);
}

import { createAction, props } from '@ngrx/store';

export const updateMetadataRequest = createAction(
  '[Configuration Page] Update Metadata Request',
  props<{ metadata: { github_url: string }}>()
);

export const updateMetadataResponse = createAction(
  '[Configuration Page] Update Metadata Response',
  props<{ metadata: { github_url: string }}>()
);

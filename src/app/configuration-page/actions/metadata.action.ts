import { createAction, props } from '@ngrx/store';

export const metadataRequest = createAction(
  '[Configuration Page] Metadata Request',
);

export const metadataResponse = createAction(
  '[Configuration Page] Metadata Response',
  props<{ metadata: { github_url: string }}>()
);

import { AppState } from '../../model';
export const selectMetadata = (state: AppState) => state.metadata || { github_url: 'yahoo.com'};

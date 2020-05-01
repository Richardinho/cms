import { AppState } from '../../model';
export const selectShowLoader = (state: AppState) => state.ui.loading;

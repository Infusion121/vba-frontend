import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './reducers/auth.reducer';
import * as fromBookmakers from './reducers/bookmakers.reducer';
import * as fromMemberInfos from './reducers/memberInfos.reducer';
import * as fromNewsletters from './reducers/newsletters.reducer';
import * as fromRingLayouts from './reducers/ringLayouts.reducer';
import * as fromInfoSheets from './reducers/infoSheets.reducer';

export interface AppState {
  auth: fromAuth.State;
  bookmakers: fromBookmakers.State;
  members: fromMemberInfos.State;
  newsletters: fromNewsletters.State;
  ringLayouts: fromRingLayouts.State;
  infoSheets: fromInfoSheets.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  bookmakers: fromBookmakers.bookmakersReducer,
  members: fromMemberInfos.memberInfosReducer,
  newsletters: fromNewsletters.newslettersReducer,
  ringLayouts: fromRingLayouts.ringLayoutsReducer,
  infoSheets: fromInfoSheets.infoSheetsReducer
};

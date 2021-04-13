import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './reducers/auth.reducer';
import * as fromBookmakers from './reducers/bookmakers.reducer';
// import * as fromUsers from './reducers/users.reducer';
// import * as fromNotifications from './reducers/notifications.reducer';
// import * as fromModals from './reducers/modals.reducer';
// import * as fromSchedules from './reducers/schedules.reducer';

export interface AppState {
  auth: fromAuth.State;
  bookmakers: fromBookmakers.State;
  //   users: fromUsers.State;
  //   notifications: fromNotifications.State;
  //   modals: fromModals.State;
  //   schedules: fromSchedules.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  bookmakers: fromBookmakers.bookmakersReducer,
  //   users: fromUsers.usersReducer,
  //   notifications: fromNotifications.notificationsReducer,
  //   modals: fromModals.modalsReducer,
  //   schedules: fromSchedules.schedulesReducer,
};

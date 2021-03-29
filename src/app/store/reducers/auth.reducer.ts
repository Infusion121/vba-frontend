import { User } from '@app/model/user.model';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  login: {
    loading: boolean;
    error: any;
  };
  logout: {
    loading: boolean;
  };
  currentUser: {
    user: User;
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  login: {
    loading: false,
    error: null,
  },
  logout: {
    loading: false,
  },
  currentUser: {
    user: null,
    loading: false,
    error: null,
  },
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        },
        currentUser: {
          ...state.currentUser,
          user: null,
          loading: true,
          error: null,
        },
      };

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: null as null,
        },
        currentUser: {
          ...state.currentUser,
          user: action.payload,
          loading: false,
          error: null,
        },
      };

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.payload,
        },
        currentUser: {
          ...state.currentUser,
          user: null,
          loading: false,
          error: null,
        },
      };

    case AuthActions.LOGOUT_START:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
        },
      };

    case AuthActions.LOGOUT_END:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: false,
        },
      };

    default:
      return state;
  }
}

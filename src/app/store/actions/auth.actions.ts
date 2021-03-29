import { User } from '@app/model/user.model';
import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_END = 'LOGOUT_END';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public username: string, public password: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

// logout user
export class LogoutStart implements Action {
  readonly type = LOGOUT_START;
  constructor() {}
}

export class LogoutEnd implements Action {
  readonly type = LOGOUT_END;
  constructor() {}
}

export type AuthActions = LoginStart | LoginSuccess | LoginFail | LogoutStart | LogoutEnd;

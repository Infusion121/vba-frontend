import { User } from '@app/model/user.model';
import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

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

export type AuthActions = LoginStart | LoginSuccess | LoginFail;

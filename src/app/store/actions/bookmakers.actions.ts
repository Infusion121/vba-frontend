import { Bookmaker } from '@app/model/bookmaker.model';
import { Action } from '@ngrx/store';

export const POST_BOOKMAKER_START = 'POST_BOOKMAKER_START';
export const POST_BOOKMAKER_SUCCESS = 'POST_BOOKMAKER_SUCCESS';
export const POST_BOOKMAKER_FAIL = 'POST_BOOKMAKER_FAIL';
export const RESET_POST_BOOKMAKER_STATE = 'RESET_POST_BOOKMAKER_STATE';

export const PUT_BOOKMAKER_BY_ID_START = 'PUT_BOOKMAKER_BY_ID_START';
export const PUT_BOOKMAKER_BY_ID_SUCCESS = 'PUT_BOOKMAKER_BY_ID_SUCCESS';
export const PUT_BOOKMAKER_BY_ID_FAIL = 'PUT_BOOKMAKER_BY_ID_FAIL';

export const RESET_BOOKMAKER_CURRENT_STATE = 'RESET_BOOKMAKER_CURRENT_STATE';

export const GET_BOOKMAKERS_START = 'GET_BOOKMAKERS_START';
export const GET_BOOKMAKERS_SUCCESS = 'GET_BOOKMAKERS_SUCCESS';
export const GET_BOOKMAKERS_FAIL = 'GET_BOOKMAKERS_FAIL';

export const GET_BOOKMAKER_BY_ID_START = 'GET_BOOKMAKER_BY_ID_START';
export const GET_BOOKMAKER_BY_ID_SUCCESS = 'GET_BOOKMAKER_BY_ID_SUCCESS';
export const GET_BOOKMAKER_BY_ID_FAIL = 'GET_BOOKMAKER_BY_ID_FAIL';

export const DELETE_BOOKMAKER_BY_ID_START = 'DELETE_BOOKMAKER_BY_ID_START';
export const DELETE_BOOKMAKER_BY_ID_SUCCESS = 'DELETE_BOOKMAKER_BY_ID_SUCCESS';
export const DELETE_BOOKMAKER_BY_ID_FAIL = 'DELETE_BOOKMAKER_BY_ID_FAIL';
export const RESET_DELETE_BOOKMAKER_STATE = 'RESET_DELETE_BOOKMAKER_STATE';

// get all bookmakers
export class GetBookmakersStart implements Action {
  readonly type = GET_BOOKMAKERS_START;
}

export class GetBookmakersSuccess implements Action {
  readonly type = GET_BOOKMAKERS_SUCCESS;
  constructor(public itemsObject: { [key: string]: Bookmaker }, public itemsArray: Bookmaker[]) {}
}

export class GetBookmakersFail implements Action {
  readonly type = GET_BOOKMAKERS_FAIL;
  constructor(public payload: string) {}
}

// union export
export type BookmakersActions = GetBookmakersStart | GetBookmakersSuccess | GetBookmakersFail;

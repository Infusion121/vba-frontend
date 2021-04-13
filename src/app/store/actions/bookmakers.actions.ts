import { Bookmaker } from '@app/model/bookmaker.model';
import { Action } from '@ngrx/store';

export const GET_BOOKMAKERS_START = 'GET_BOOKMAKERS_START';
export const GET_BOOKMAKERS_SUCCESS = 'GET_BOOKMAKERS_SUCCESS';
export const GET_BOOKMAKERS_FAIL = 'GET_BOOKMAKERS_FAIL';

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

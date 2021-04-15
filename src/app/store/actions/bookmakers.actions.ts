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

export const UPLOAD_PHOTOS_START = 'UPLOAD_PHOTOS_START';
export const UPLOAD_PHOTOS_SUCCESS = 'UPLOAD_PHOTOS_SUCCESS';
export const UPLOAD_PHOTOS_FAIL = 'UPLOAD_PHOTOS_FAIL';

export const RESET_UPLOAD_PHOTOS_STATE = 'RESET_UPLOAD_PHOTOS_STATE';

// create new bookmaker
export class PostBookmakerStart implements Action {
  readonly type = POST_BOOKMAKER_START;
  constructor(public payload: Bookmaker) {}
}

export class PostBookmakerSuccess implements Action {
  readonly type = POST_BOOKMAKER_SUCCESS;
  constructor(public payload: any) {}
}

export class PostBookmakerFail implements Action {
  readonly type = POST_BOOKMAKER_FAIL;
  constructor(public payload: any) {}
}

export class ResetPostBookmakerState implements Action {
  readonly type = RESET_POST_BOOKMAKER_STATE;
  constructor() {}
}

// update bookmaker by id
export class PutBookmakerByIdStart implements Action {
  readonly type = PUT_BOOKMAKER_BY_ID_START;
  constructor(public payload: Bookmaker, public id: string) {}
}

export class PutBookmakerByIdSuccess implements Action {
  readonly type = PUT_BOOKMAKER_BY_ID_SUCCESS;
  constructor(public payload: Bookmaker) {}
}

export class PutBookmakerByIdFail implements Action {
  readonly type = PUT_BOOKMAKER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// reset state on bookmakerCurrent
export class ResetBookmakerCurrentState implements Action {
  readonly type = RESET_BOOKMAKER_CURRENT_STATE;
  constructor() {}
}

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

// get bookmaker by id
export class GetBookmakerByIdStart implements Action {
  readonly type = GET_BOOKMAKER_BY_ID_START;
  constructor(public payload: string) {}
}

export class GetBookmakerByIdSuccess implements Action {
  readonly type = GET_BOOKMAKER_BY_ID_SUCCESS;
  constructor(public payload: Bookmaker) {}
}

export class GetBookmakerByIdFail implements Action {
  readonly type = GET_BOOKMAKER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// delete bookmaker by id
export class DeleteBookmakerByIdStart implements Action {
  readonly type = DELETE_BOOKMAKER_BY_ID_START;
  constructor(public payload: string) {}
}

export class DeleteBookmakerByIdSuccess implements Action {
  readonly type = DELETE_BOOKMAKER_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteBookmakerByIdFail implements Action {
  readonly type = DELETE_BOOKMAKER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

export class ResetDeleteBookmakerByIdState implements Action {
  readonly type = RESET_DELETE_BOOKMAKER_STATE;
  constructor() {}
}

export class UploadPhotosStart implements Action {
  readonly type = UPLOAD_PHOTOS_START;
  constructor(public files: File[]) {}
}

export class UploadPhotosSuccess implements Action {
  readonly type = UPLOAD_PHOTOS_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadPhotosFail implements Action {
  readonly type = UPLOAD_PHOTOS_FAIL;
  constructor(public payload: any) {}
}

export class ResetUploadPhotosState implements Action {
  readonly type = RESET_UPLOAD_PHOTOS_STATE;
  constructor() {}
}

// union export
export type BookmakersActions =
  | PostBookmakerStart
  | PostBookmakerSuccess
  | PostBookmakerFail
  | ResetPostBookmakerState
  | PutBookmakerByIdStart
  | PutBookmakerByIdSuccess
  | PutBookmakerByIdFail
  | ResetBookmakerCurrentState
  | GetBookmakersStart
  | GetBookmakersSuccess
  | GetBookmakersFail
  | GetBookmakerByIdStart
  | GetBookmakerByIdSuccess
  | GetBookmakerByIdFail
  | DeleteBookmakerByIdStart
  | DeleteBookmakerByIdSuccess
  | DeleteBookmakerByIdFail
  | ResetDeleteBookmakerByIdState
  | UploadPhotosStart
  | UploadPhotosSuccess
  | UploadPhotosFail
  | ResetUploadPhotosState;

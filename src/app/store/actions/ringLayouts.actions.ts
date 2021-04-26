import { RingLayout } from '@app/model/ringLayout.model';
import { Action } from '@ngrx/store';

export const POST_RINGLAYOUT_START = 'POST_RINGLAYOUT_START';
export const POST_RINGLAYOUT_SUCCESS = 'POST_RINGLAYOUT_SUCCESS';
export const POST_RINGLAYOUT_FAIL = 'POST_RINGLAYOUT_FAIL';
export const RESET_POST_RINGLAYOUT_STATE = 'RESET_POST_RINGLAYOUT_STATE';

export const PUT_RINGLAYOUT_BY_ID_START = 'PUT_RINGLAYOUT_BY_ID_START';
export const PUT_RINGLAYOUT_BY_ID_SUCCESS = 'PUT_RINGLAYOUT_BY_ID_SUCCESS';
export const PUT_RINGLAYOUT_BY_ID_FAIL = 'PUT_RINGLAYOUT_BY_ID_FAIL';
export const RESET_RINGLAYOUT_CURRENT_STATE = 'RESET_RINGLAYOUT_CURRENT_STATE';

export const GET_RINGLAYOUTS_START = 'GET_RINGLAYOUTS_START';
export const GET_RINGLAYOUTS_SUCCESS = 'GET_RINGLAYOUTS_SUCCESS';
export const GET_RINGLAYOUTS_FAIL = 'GET_RINGLAYOUTS_FAIL';

export const GET_RINGLAYOUT_BY_ID_START = 'GET_RINGLAYOUT_BY_ID_START';
export const GET_RINGLAYOUT_BY_ID_SUCCESS = 'GET_RINGLAYOUT_BY_ID_SUCCESS';
export const GET_RINGLAYOUT_BY_ID_FAIL = 'GET_RINGLAYOUT_BY_ID_FAIL';

export const DELETE_RINGLAYOUT_BY_ID_START = 'DELETE_RINGLAYOUT_BY_ID_START';
export const DELETE_RINGLAYOUT_BY_ID_SUCCESS = 'DELETE_RINGLAYOUT_BY_ID_SUCCESS';
export const DELETE_RINGLAYOUT_BY_ID_FAIL = 'DELETE_RINGLAYOUT_BY_ID_FAIL';
export const RESET_DELETE_RINGLAYOUT_STATE = 'RESET_DELETE_RINGLAYOUT_STATE';

export const UPLOAD_RINGLAYOUT_FILE_START = 'UPLOAD_RINGLAYOUT_FILE_START';
export const UPLOAD_RINGLAYOUT_FILE_SUCCESS = 'UPLOAD_RINGLAYOUT_FILE_SUCCESS';
export const UPLOAD_RINGLAYOUT_FILE_FAIL = 'UPLOAD_RINGLAYOUT_FILE_FAIL';

export const RESET_UPLOAD_RINGLAYOUT_FILE_STATE = 'RESET_UPLOAD_RINGLAYOUT_FILE_STATE';

// create new ring layout
export class PostRingLayoutStart implements Action {
  readonly type = POST_RINGLAYOUT_START;
  constructor(public payload: RingLayout) {}
}

export class PostRingLayoutSuccess implements Action {
  readonly type = POST_RINGLAYOUT_SUCCESS;
  constructor(public payload: any) {}
}

export class PostRingLayoutFail implements Action {
  readonly type = POST_RINGLAYOUT_FAIL;
  constructor(public payload: any) {}
}

export class ResetPostRingLayoutState implements Action {
  readonly type = RESET_POST_RINGLAYOUT_STATE;
  constructor() {}
}

// update ring layout by id
export class PutRingLayoutByIdStart implements Action {
  readonly type = PUT_RINGLAYOUT_BY_ID_START;
  constructor(public payload: RingLayout, public id: string) {}
}

export class PutRingLayoutByIdSuccess implements Action {
  readonly type = PUT_RINGLAYOUT_BY_ID_SUCCESS;
  constructor(public payload: RingLayout) {}
}

export class PutRingLayoutByIdFail implements Action {
  readonly type = PUT_RINGLAYOUT_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// reset state on bookmakerCurrent
export class ResetRingLayoutCurrentState implements Action {
  readonly type = RESET_RINGLAYOUT_CURRENT_STATE;
  constructor() {}
}

// get all bookmakers
export class GetRingLayoutsStart implements Action {
  readonly type = GET_RINGLAYOUTS_START;
}

export class GetRingLayoutsSuccess implements Action {
  readonly type = GET_RINGLAYOUTS_SUCCESS;
  constructor(public itemsObject: { [key: string]: RingLayout }, public itemsArray: RingLayout[]) {}
}

export class GetRingLayoutsFail implements Action {
  readonly type = GET_RINGLAYOUTS_FAIL;
  constructor(public payload: string) {}
}

// get ring layout by id
export class GetRingLayoutByIdStart implements Action {
  readonly type = GET_RINGLAYOUT_BY_ID_START;
  constructor(public payload: string) {}
}

export class GetRingLayoutByIdSuccess implements Action {
  readonly type = GET_RINGLAYOUT_BY_ID_SUCCESS;
  constructor(public payload: RingLayout) {}
}

export class GetRingLayoutByIdFail implements Action {
  readonly type = GET_RINGLAYOUT_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// delete ringlayout by id
export class DeleteRingLayoutByIdStart implements Action {
  readonly type = DELETE_RINGLAYOUT_BY_ID_START;
  constructor(public payload: string) {}
}

export class DeleteRingLayoutByIdSuccess implements Action {
  readonly type = DELETE_RINGLAYOUT_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteRingLayoutByIdFail implements Action {
  readonly type = DELETE_RINGLAYOUT_BY_ID_FAIL;
  constructor(public payload: any) {}
}

export class ResetDeleteRingLayoutByIdState implements Action {
  readonly type = RESET_DELETE_RINGLAYOUT_STATE;
  constructor() {}
}

// upload ring layout file
export class UploadRingLayoutFileStart implements Action {
  readonly type = UPLOAD_RINGLAYOUT_FILE_START;
  constructor(public file: File) {}
}

export class UploadRingLayoutFileSuccess implements Action {
  readonly type = UPLOAD_RINGLAYOUT_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadRingLayoutFileFail implements Action {
  readonly type = UPLOAD_RINGLAYOUT_FILE_FAIL;
  constructor(public payload: any) {}
}

export class ResetUploadRingLayoutFileState implements Action {
  readonly type = RESET_UPLOAD_RINGLAYOUT_FILE_STATE;
  constructor() {}
}

// union export
export type RingLayoutsActions =
  | PostRingLayoutStart
  | PostRingLayoutSuccess
  | PostRingLayoutFail
  | ResetPostRingLayoutState
  | PutRingLayoutByIdStart
  | PutRingLayoutByIdSuccess
  | PutRingLayoutByIdFail
  | ResetRingLayoutCurrentState
  | GetRingLayoutsStart
  | GetRingLayoutsSuccess
  | GetRingLayoutsFail
  | GetRingLayoutByIdStart
  | GetRingLayoutByIdSuccess
  | GetRingLayoutByIdFail
  | DeleteRingLayoutByIdStart
  | DeleteRingLayoutByIdSuccess
  | DeleteRingLayoutByIdFail
  | ResetDeleteRingLayoutByIdState
  | UploadRingLayoutFileStart
  | UploadRingLayoutFileSuccess
  | UploadRingLayoutFileFail
  | ResetUploadRingLayoutFileState;

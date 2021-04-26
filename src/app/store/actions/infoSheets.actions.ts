import { InfoSheet } from '@app/model/infoSheet.model';
import { Action } from '@ngrx/store';

export const POST_INFOSHEET_START = 'POST_INFOSHEET_START';
export const POST_INFOSHEET_SUCCESS = 'POST_INFOSHEET_SUCCESS';
export const POST_INFOSHEET_FAIL = 'POST_INFOSHEET_FAIL';
export const RESET_POST_INFOSHEET_STATE = 'RESET_POST_INFOSHEET_STATE';

export const PUT_INFOSHEET_BY_ID_START = 'PUT_INFOSHEET_BY_ID_START';
export const PUT_INFOSHEET_BY_ID_SUCCESS = 'PUT_INFOSHEET_BY_ID_SUCCESS';
export const PUT_INFOSHEET_BY_ID_FAIL = 'PUT_INFOSHEET_BY_ID_FAIL';
export const RESET_INFOSHEET_CURRENT_STATE = 'RESET_INFOSHEET_CURRENT_STATE';

export const GET_INFOSHEETS_START = 'GET_INFOSHEETS_START';
export const GET_INFOSHEETS_SUCCESS = 'GET_INFOSHEETS_SUCCESS';
export const GET_INFOSHEETS_FAIL = 'GET_INFOSHEETS_FAIL';

export const GET_INFOSHEET_BY_ID_START = 'GET_INFOSHEET_BY_ID_START';
export const GET_INFOSHEET_BY_ID_SUCCESS = 'GET_INFOSHEET_BY_ID_SUCCESS';
export const GET_INFOSHEET_BY_ID_FAIL = 'GET_INFOSHEET_BY_ID_FAIL';

export const DELETE_INFOSHEET_BY_ID_START = 'DELETE_INFOSHEET_BY_ID_START';
export const DELETE_INFOSHEET_BY_ID_SUCCESS = 'DELETE_INFOSHEET_BY_ID_SUCCESS';
export const DELETE_INFOSHEET_BY_ID_FAIL = 'DELETE_INFOSHEET_BY_ID_FAIL';
export const RESET_DELETE_INFOSHEET_STATE = 'RESET_DELETE_INFOSHEET_STATE';

export const UPLOAD_INFOSHEET_FILE_START = 'UPLOAD_INFOSHEET_FILE_START';
export const UPLOAD_INFOSHEET_FILE_SUCCESS = 'UPLOAD_INFOSHEET_FILE_SUCCESS';
export const UPLOAD_INFOSHEET_FILE_FAIL = 'UPLOAD_INFOSHEET_FILE_FAIL';

export const RESET_UPLOAD_INFOSHEET_FILE_STATE = 'RESET_UPLOAD_INFOSHEET_FILE_STATE';

// create new info sheet
export class PostInfoSheetStart implements Action {
  readonly type = POST_INFOSHEET_START;
  constructor(public payload: InfoSheet) {}
}

export class PostInfoSheetSuccess implements Action {
  readonly type = POST_INFOSHEET_SUCCESS;
  constructor(public payload: any) {}
}

export class PostInfoSheetFail implements Action {
  readonly type = POST_INFOSHEET_FAIL;
  constructor(public payload: any) {}
}

export class ResetPostInfoSheetState implements Action {
  readonly type = RESET_POST_INFOSHEET_STATE;
  constructor() {}
}

// update info sheet by id
export class PutInfoSheetByIdStart implements Action {
  readonly type = PUT_INFOSHEET_BY_ID_START;
  constructor(public payload: InfoSheet, public id: string) {}
}

export class PutInfoSheetByIdSuccess implements Action {
  readonly type = PUT_INFOSHEET_BY_ID_SUCCESS;
  constructor(public payload: InfoSheet) {}
}

export class PutInfoSheetByIdFail implements Action {
  readonly type = PUT_INFOSHEET_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// reset state on bookmakerCurrent
export class ResetInfoSheetCurrentState implements Action {
  readonly type = RESET_INFOSHEET_CURRENT_STATE;
  constructor() {}
}

// get all bookmakers
export class GetInfoSheetsStart implements Action {
  readonly type = GET_INFOSHEETS_START;
}

export class GetInfoSheetsSuccess implements Action {
  readonly type = GET_INFOSHEETS_SUCCESS;
  constructor(public itemsObject: { [key: string]: InfoSheet }, public itemsArray: InfoSheet[]) {}
}

export class GetInfoSheetsFail implements Action {
  readonly type = GET_INFOSHEETS_FAIL;
  constructor(public payload: string) {}
}

// get info sheet by id
export class GetInfoSheetByIdStart implements Action {
  readonly type = GET_INFOSHEET_BY_ID_START;
  constructor(public payload: string) {}
}

export class GetInfoSheetByIdSuccess implements Action {
  readonly type = GET_INFOSHEET_BY_ID_SUCCESS;
  constructor(public payload: InfoSheet) {}
}

export class GetInfoSheetByIdFail implements Action {
  readonly type = GET_INFOSHEET_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// delete info sheet by id
export class DeleteInfoSheetByIdStart implements Action {
  readonly type = DELETE_INFOSHEET_BY_ID_START;
  constructor(public payload: string) {}
}

export class DeleteInfoSheetByIdSuccess implements Action {
  readonly type = DELETE_INFOSHEET_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteInfoSheetByIdFail implements Action {
  readonly type = DELETE_INFOSHEET_BY_ID_FAIL;
  constructor(public payload: any) {}
}

export class ResetDeleteInfoSheetByIdState implements Action {
  readonly type = RESET_DELETE_INFOSHEET_STATE;
  constructor() {}
}

// upload info sheet file
export class UploadInfoSheetFileStart implements Action {
  readonly type = UPLOAD_INFOSHEET_FILE_START;
  constructor(public file: File) {}
}

export class UploadInfoSheetFileSuccess implements Action {
  readonly type = UPLOAD_INFOSHEET_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadInfoSheetFileFail implements Action {
  readonly type = UPLOAD_INFOSHEET_FILE_FAIL;
  constructor(public payload: any) {}
}

export class ResetUploadInfoSheetFileState implements Action {
  readonly type = RESET_UPLOAD_INFOSHEET_FILE_STATE;
  constructor() {}
}

// union export
export type InfoSheetsActions =
  | PostInfoSheetStart
  | PostInfoSheetSuccess
  | PostInfoSheetFail
  | ResetPostInfoSheetState
  | PutInfoSheetByIdStart
  | PutInfoSheetByIdSuccess
  | PutInfoSheetByIdFail
  | ResetInfoSheetCurrentState
  | GetInfoSheetsStart
  | GetInfoSheetsSuccess
  | GetInfoSheetsFail
  | GetInfoSheetByIdStart
  | GetInfoSheetByIdSuccess
  | GetInfoSheetByIdFail
  | DeleteInfoSheetByIdStart
  | DeleteInfoSheetByIdSuccess
  | DeleteInfoSheetByIdFail
  | ResetDeleteInfoSheetByIdState
  | UploadInfoSheetFileStart
  | UploadInfoSheetFileSuccess
  | UploadInfoSheetFileFail
  | ResetUploadInfoSheetFileState;

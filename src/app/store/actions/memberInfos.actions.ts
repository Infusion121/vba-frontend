import { MemberInfo } from '@app/model/memberInfo.model';
import { Action } from '@ngrx/store';

export const POST_MEMBERINFO_START = 'POST_MEMBERINFO_START';
export const POST_MEMBERINFO_SUCCESS = 'POST_MEMBERINFO_SUCCESS';
export const POST_MEMBERINFO_FAIL = 'POST_MEMBERINFO_FAIL';
export const RESET_POST_MEMBERINFO_STATE = 'RESET_POST_MEMBERINFO_STATE';

export const PUT_MEMBERINFO_BY_ID_START = 'PUT_MEMBERINFO_BY_ID_START';
export const PUT_MEMBERINFO_BY_ID_SUCCESS = 'PUT_MEMBERINFO_BY_ID_SUCCESS';
export const PUT_MEMBERINFO_BY_ID_FAIL = 'PUT_MEMBERINFO_BY_ID_FAIL';
export const RESET_MEMBERINFO_CURRENT_STATE = 'RESET_MEMBERINFO_CURRENT_STATE';

export const GET_MEMBERINFOS_START = 'GET_MEMBERINFOS_START';
export const GET_MEMBERINFOS_SUCCESS = 'GET_MEMBERINFOS_SUCCESS';
export const GET_MEMBERINFOS_FAIL = 'GET_MEMBERINFOS_FAIL';

export const GET_MEMBERINFO_BY_ID_START = 'GET_MEMBERINFO_BY_ID_START';
export const GET_MEMBERINFO_BY_ID_SUCCESS = 'GET_MEMBERINFO_BY_ID_SUCCESS';
export const GET_MEMBERINFO_BY_ID_FAIL = 'GET_MEMBERINFO_BY_ID_FAIL';

export const DELETE_MEMBERINFO_BY_ID_START = 'DELETE_MEMBERINFO_BY_ID_START';
export const DELETE_MEMBERINFO_BY_ID_SUCCESS = 'DELETE_MEMBERINFO_BY_ID_SUCCESS';
export const DELETE_MEMBERINFO_BY_ID_FAIL = 'DELETE_MEMBERINFO_BY_ID_FAIL';
export const RESET_DELETE_MEMBERINFO_STATE = 'RESET_DELETE_MEMBERINFO_STATE';

export const UPLOAD_MEMBERINFO_FILE_START = 'UPLOAD_MEMBERINFO_FILE_START';
export const UPLOAD_MEMBERINFO_FILE_SUCCESS = 'UPLOAD_MEMBERINFO_FILE_SUCCESS';
export const UPLOAD_MEMBERINFO_FILE_FAIL = 'UPLOAD_MEMBERINFO_FILE_FAIL';

export const RESET_UPLOAD_MEMBERINFO_FILE_STATE = 'RESET_UPLOAD_MEMBERINFO_FILE_STATE';

// create new member
export class PostMemberInfoStart implements Action {
  readonly type = POST_MEMBERINFO_START;
  constructor(public payload: MemberInfo) {}
}

export class PostMemberInfoSuccess implements Action {
  readonly type = POST_MEMBERINFO_SUCCESS;
  constructor(public payload: any) {}
}

export class PostMemberInfoFail implements Action {
  readonly type = POST_MEMBERINFO_FAIL;
  constructor(public payload: any) {}
}

export class ResetPostMemberInfoState implements Action {
  readonly type = RESET_POST_MEMBERINFO_STATE;
  constructor() {}
}

// update member info by id
export class PutMemberInfoByIdStart implements Action {
  readonly type = PUT_MEMBERINFO_BY_ID_START;
  constructor(public payload: MemberInfo, public id: string) {}
}

export class PutMemberInfoByIdSuccess implements Action {
  readonly type = PUT_MEMBERINFO_BY_ID_SUCCESS;
  constructor(public payload: MemberInfo) {}
}

export class PutMemberInfoByIdFail implements Action {
  readonly type = PUT_MEMBERINFO_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// reset state on bookmakerCurrent
export class ResetMemberInfoCurrentState implements Action {
  readonly type = RESET_MEMBERINFO_CURRENT_STATE;
  constructor() {}
}

// get all bookmakers
export class GetMemberInfosStart implements Action {
  readonly type = GET_MEMBERINFOS_START;
}

export class GetMemberInfosSuccess implements Action {
  readonly type = GET_MEMBERINFOS_SUCCESS;
  constructor(public itemsObject: { [key: string]: MemberInfo }, public itemsArray: MemberInfo[]) {}
}

export class GetMemberInfosFail implements Action {
  readonly type = GET_MEMBERINFOS_FAIL;
  constructor(public payload: string) {}
}

// get member info by id
export class GetMemberInfoByIdStart implements Action {
  readonly type = GET_MEMBERINFO_BY_ID_START;
  constructor(public payload: string) {}
}

export class GetMemberInfoByIdSuccess implements Action {
  readonly type = GET_MEMBERINFO_BY_ID_SUCCESS;
  constructor(public payload: MemberInfo) {}
}

export class GetMemberInfoByIdFail implements Action {
  readonly type = GET_MEMBERINFO_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// delete memberinfo by id
export class DeleteMemberInfoByIdStart implements Action {
  readonly type = DELETE_MEMBERINFO_BY_ID_START;
  constructor(public payload: string) {}
}

export class DeleteMemberInfoByIdSuccess implements Action {
  readonly type = DELETE_MEMBERINFO_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteMemberInfoByIdFail implements Action {
  readonly type = DELETE_MEMBERINFO_BY_ID_FAIL;
  constructor(public payload: any) {}
}

export class ResetDeleteMemberInfoByIdState implements Action {
  readonly type = RESET_DELETE_MEMBERINFO_STATE;
  constructor() {}
}

// upload member info file
export class UploadMemberInfoFileStart implements Action {
  readonly type = UPLOAD_MEMBERINFO_FILE_START;
  constructor(public file: File) {}
}

export class UploadMemberInfoFileSuccess implements Action {
  readonly type = UPLOAD_MEMBERINFO_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadMemberInfoFileFail implements Action {
  readonly type = UPLOAD_MEMBERINFO_FILE_FAIL;
  constructor(public payload: any) {}
}

export class ResetUploadMemberInfoFileState implements Action {
  readonly type = RESET_UPLOAD_MEMBERINFO_FILE_STATE;
  constructor() {}
}

// union export
export type MemberInfosActions =
  | PostMemberInfoStart
  | PostMemberInfoSuccess
  | PostMemberInfoFail
  | ResetPostMemberInfoState
  | PutMemberInfoByIdStart
  | PutMemberInfoByIdSuccess
  | PutMemberInfoByIdFail
  | ResetMemberInfoCurrentState
  | GetMemberInfosStart
  | GetMemberInfosSuccess
  | GetMemberInfosFail
  | GetMemberInfoByIdStart
  | GetMemberInfoByIdSuccess
  | GetMemberInfoByIdFail
  | DeleteMemberInfoByIdStart
  | DeleteMemberInfoByIdSuccess
  | DeleteMemberInfoByIdFail
  | ResetDeleteMemberInfoByIdState
  | UploadMemberInfoFileStart
  | UploadMemberInfoFileSuccess
  | UploadMemberInfoFileFail
  | ResetUploadMemberInfoFileState;

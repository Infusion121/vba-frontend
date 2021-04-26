import { Newsletter } from '@app/model/newsletter.model';
import { Action } from '@ngrx/store';

export const POST_NEWSLETTER_START = 'POST_NEWSLETTER_START';
export const POST_NEWSLETTER_SUCCESS = 'POST_NEWSLETTER_SUCCESS';
export const POST_NEWSLETTER_FAIL = 'POST_NEWSLETTER_FAIL';
export const RESET_POST_NEWSLETTER_STATE = 'RESET_POST_NEWSLETTER_STATE';

export const PUT_NEWSLETTER_BY_ID_START = 'PUT_NEWSLETTER_BY_ID_START';
export const PUT_NEWSLETTER_BY_ID_SUCCESS = 'PUT_NEWSLETTER_BY_ID_SUCCESS';
export const PUT_NEWSLETTER_BY_ID_FAIL = 'PUT_NEWSLETTER_BY_ID_FAIL';
export const RESET_NEWSLETTER_CURRENT_STATE = 'RESET_NEWSLETTER_CURRENT_STATE';

export const GET_NEWSLETTERS_START = 'GET_NEWSLETTERS_START';
export const GET_NEWSLETTERS_SUCCESS = 'GET_NEWSLETTERS_SUCCESS';
export const GET_NEWSLETTERS_FAIL = 'GET_NEWSLETTERS_FAIL';

export const GET_NEWSLETTER_BY_ID_START = 'GET_NEWSLETTER_BY_ID_START';
export const GET_NEWSLETTER_BY_ID_SUCCESS = 'GET_NEWSLETTER_BY_ID_SUCCESS';
export const GET_NEWSLETTER_BY_ID_FAIL = 'GET_NEWSLETTER_BY_ID_FAIL';

export const DELETE_NEWSLETTER_BY_ID_START = 'DELETE_NEWSLETTER_BY_ID_START';
export const DELETE_NEWSLETTER_BY_ID_SUCCESS = 'DELETE_NEWSLETTER_BY_ID_SUCCESS';
export const DELETE_NEWSLETTER_BY_ID_FAIL = 'DELETE_NEWSLETTER_BY_ID_FAIL';
export const RESET_DELETE_NEWSLETTER_STATE = 'RESET_DELETE_NEWSLETTER_STATE';

export const UPLOAD_NEWSLETTER_FILE_START = 'UPLOAD_NEWSLETTER_FILE_START';
export const UPLOAD_NEWSLETTER_FILE_SUCCESS = 'UPLOAD_NEWSLETTER_FILE_SUCCESS';
export const UPLOAD_NEWSLETTER_FILE_FAIL = 'UPLOAD_NEWSLETTER_FILE_FAIL';

export const RESET_UPLOAD_NEWSLETTER_FILE_STATE = 'RESET_UPLOAD_NEWSLETTER_FILE_STATE';

// create new newsletter
export class PostNewsletterStart implements Action {
  readonly type = POST_NEWSLETTER_START;
  constructor(public payload: Newsletter) {}
}

export class PostNewsletterSuccess implements Action {
  readonly type = POST_NEWSLETTER_SUCCESS;
  constructor(public payload: any) {}
}

export class PostNewsletterFail implements Action {
  readonly type = POST_NEWSLETTER_FAIL;
  constructor(public payload: any) {}
}

export class ResetPostNewsletterState implements Action {
  readonly type = RESET_POST_NEWSLETTER_STATE;
  constructor() {}
}

// update newsletter by id
export class PutNewsletterByIdStart implements Action {
  readonly type = PUT_NEWSLETTER_BY_ID_START;
  constructor(public payload: Newsletter, public id: string) {}
}

export class PutNewsletterByIdSuccess implements Action {
  readonly type = PUT_NEWSLETTER_BY_ID_SUCCESS;
  constructor(public payload: Newsletter) {}
}

export class PutNewsletterByIdFail implements Action {
  readonly type = PUT_NEWSLETTER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// reset state on bookmakerCurrent
export class ResetNewsletterCurrentState implements Action {
  readonly type = RESET_NEWSLETTER_CURRENT_STATE;
  constructor() {}
}

// get all bookmakers
export class GetNewslettersStart implements Action {
  readonly type = GET_NEWSLETTERS_START;
}

export class GetNewslettersSuccess implements Action {
  readonly type = GET_NEWSLETTERS_SUCCESS;
  constructor(public itemsObject: { [key: string]: Newsletter }, public itemsArray: Newsletter[]) {}
}

export class GetNewslettersFail implements Action {
  readonly type = GET_NEWSLETTERS_FAIL;
  constructor(public payload: string) {}
}

// get newsletter by id
export class GetNewsletterByIdStart implements Action {
  readonly type = GET_NEWSLETTER_BY_ID_START;
  constructor(public payload: string) {}
}

export class GetNewsletterByIdSuccess implements Action {
  readonly type = GET_NEWSLETTER_BY_ID_SUCCESS;
  constructor(public payload: Newsletter) {}
}

export class GetNewsletterByIdFail implements Action {
  readonly type = GET_NEWSLETTER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

// delete newsletter by id
export class DeleteNewsletterByIdStart implements Action {
  readonly type = DELETE_NEWSLETTER_BY_ID_START;
  constructor(public payload: string) {}
}

export class DeleteNewsletterByIdSuccess implements Action {
  readonly type = DELETE_NEWSLETTER_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteNewsletterByIdFail implements Action {
  readonly type = DELETE_NEWSLETTER_BY_ID_FAIL;
  constructor(public payload: any) {}
}

export class ResetDeleteNewsletterByIdState implements Action {
  readonly type = RESET_DELETE_NEWSLETTER_STATE;
  constructor() {}
}

// upload newsletter file
export class UploadNewsletterFileStart implements Action {
  readonly type = UPLOAD_NEWSLETTER_FILE_START;
  constructor(public file: File) {}
}

export class UploadNewsletterFileSuccess implements Action {
  readonly type = UPLOAD_NEWSLETTER_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadNewsletterFileFail implements Action {
  readonly type = UPLOAD_NEWSLETTER_FILE_FAIL;
  constructor(public payload: any) {}
}

export class ResetUploadNewsletterFileState implements Action {
  readonly type = RESET_UPLOAD_NEWSLETTER_FILE_STATE;
  constructor() {}
}

// union export
export type NewslettersActions =
  | PostNewsletterStart
  | PostNewsletterSuccess
  | PostNewsletterFail
  | ResetPostNewsletterState
  | PutNewsletterByIdStart
  | PutNewsletterByIdSuccess
  | PutNewsletterByIdFail
  | ResetNewsletterCurrentState
  | GetNewslettersStart
  | GetNewslettersSuccess
  | GetNewslettersFail
  | GetNewsletterByIdStart
  | GetNewsletterByIdSuccess
  | GetNewsletterByIdFail
  | DeleteNewsletterByIdStart
  | DeleteNewsletterByIdSuccess
  | DeleteNewsletterByIdFail
  | ResetDeleteNewsletterByIdState
  | UploadNewsletterFileStart
  | UploadNewsletterFileSuccess
  | UploadNewsletterFileFail
  | ResetUploadNewsletterFileState;

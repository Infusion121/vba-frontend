import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as InfoSheetsActions from '../actions/infoSheets.actions';
import * as _ from 'lodash';
import { InfoSheet } from '@app/model/infoSheet.model';


@Injectable()
export class InfoSheetsEffects {
  rootUrl = 'http://localhost:3600/api/rvl-info-sheets';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/api/bookmakers';

  // get all info sheet
  @Effect()
  getInfoSheetsStart = this.actions$.pipe(
    ofType(InfoSheetsActions.GET_INFOSHEETS_START),
    switchMap((getInfoSheetsAction: InfoSheetsActions.GetInfoSheetsStart) => {
      return this.http.get(this.rootUrl + '/admin/all').pipe(
        map((response: InfoSheet[]) => {
          const itemsObject = {};
          _.each(response, (item: InfoSheet) => {
            itemsObject[item._id] = item;
          });
          return new InfoSheetsActions.GetInfoSheetsSuccess(itemsObject, response);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.GetInfoSheetsFail(error));
        })
      );
    })
  );

  // create new info sheet
  @Effect()
  postInfoSheetStart = this.actions$.pipe(
    ofType(InfoSheetsActions.POST_INFOSHEET_START),
    switchMap((postInfoSheetNewAction: InfoSheetsActions.PostInfoSheetStart) => {
      return this.http.post(this.rootUrl + '/new', postInfoSheetNewAction.payload).pipe(
        map((response) => {
          return new InfoSheetsActions.PostInfoSheetSuccess(response);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.PostInfoSheetFail(error));
        })
      );
    })
  );

  // update info sheet by id
  @Effect()
  updateInfoSheetStart = this.actions$.pipe(
    ofType(InfoSheetsActions.PUT_INFOSHEET_BY_ID_START),
    switchMap((putInfoSheetByIdAction: InfoSheetsActions.PutInfoSheetByIdStart) => {
      return this.http.put(this.rootUrl + '/' + putInfoSheetByIdAction.id, putInfoSheetByIdAction.payload).pipe(
        map((response) => {
          return new InfoSheetsActions.PutInfoSheetByIdSuccess(response as InfoSheet);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.PutInfoSheetByIdFail(error));
        })
      );
    })
  );

  // get info sheet by id
  @Effect()
  getInfoSheetByIdStart = this.actions$.pipe(
    ofType(InfoSheetsActions.GET_INFOSHEET_BY_ID_START),
    switchMap((getInfoSheetByIdAction: InfoSheetsActions.GetInfoSheetByIdStart) => {
      return this.http.get(this.rootUrl + '/' + getInfoSheetByIdAction.payload).pipe(
        map((response) => {
          return new InfoSheetsActions.GetInfoSheetByIdSuccess(response as InfoSheet);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.GetInfoSheetByIdFail(error));
        })
      );
    })
  );

  // delete info sheet by id
  @Effect()
  deleteInfoSheetByIdStart = this.actions$.pipe(
    ofType(InfoSheetsActions.DELETE_INFOSHEET_BY_ID_START),
    switchMap((deleteInfoSheetByIdAction: InfoSheetsActions.DeleteInfoSheetByIdStart) => {
      return this.http.delete(this.rootUrl + '/' + deleteInfoSheetByIdAction.payload).pipe(
        map((response) => {
          return new InfoSheetsActions.DeleteInfoSheetByIdSuccess(response as InfoSheet);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.DeleteInfoSheetByIdFail(error));
        })
      );
    })
  );

  // upload photo file
  @Effect()
  uploadInfoSheetFile = this.actions$.pipe(
    ofType(InfoSheetsActions.UPLOAD_INFOSHEET_FILE_START),
    switchMap((uploadInfoSheetFileAction: InfoSheetsActions.UploadInfoSheetFileStart) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const formData = new FormData();
			formData.append('photo', uploadInfoSheetFileAction.file);

      return this.http.post('http://localhost:3600/api/upload/upload-rvl-info-sheet-file', formData, { headers }).pipe(
        map((response) => {
          return new InfoSheetsActions.UploadInfoSheetFileSuccess(response);
        }),
        catchError((error) => {
          return of(new InfoSheetsActions.UploadInfoSheetFileFail(error));
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

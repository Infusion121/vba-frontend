import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as RingLayoutsActions from '../actions/ringLayouts.actions';
import * as _ from 'lodash';
import { RingLayout } from '@app/model/ringLayout.model';


@Injectable()
export class RingLayoutsEffects {
  rootUrl = 'http://localhost:3600/api/ring-layouts';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/api/bookmakers';

  // get all ring layout
  @Effect()
  getRingLayoutsStart = this.actions$.pipe(
    ofType(RingLayoutsActions.GET_RINGLAYOUTS_START),
    switchMap((getRingLayoutsAction: RingLayoutsActions.GetRingLayoutsStart) => {
      return this.http.get(this.rootUrl + '/all').pipe(
        map((response: RingLayout[]) => {
          const itemsObject = {};
          _.each(response, (item: RingLayout) => {
            itemsObject[item._id] = item;
          });
          return new RingLayoutsActions.GetRingLayoutsSuccess(itemsObject, response);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.GetRingLayoutsFail(error));
        })
      );
    })
  );

  // create new ring layout
  @Effect()
  postRingLayoutStart = this.actions$.pipe(
    ofType(RingLayoutsActions.POST_RINGLAYOUT_START),
    switchMap((postRingLayoutNewAction: RingLayoutsActions.PostRingLayoutStart) => {
      return this.http.post(this.rootUrl + '/new', postRingLayoutNewAction.payload).pipe(
        map((response) => {
          return new RingLayoutsActions.PostRingLayoutSuccess(response);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.PostRingLayoutFail(error));
        })
      );
    })
  );

  // update ring layout by id
  @Effect()
  updateRingLayoutStart = this.actions$.pipe(
    ofType(RingLayoutsActions.PUT_RINGLAYOUT_BY_ID_START),
    switchMap((putRingLayoutByIdAction: RingLayoutsActions.PutRingLayoutByIdStart) => {
      return this.http.put(this.rootUrl + '/' + putRingLayoutByIdAction.id, putRingLayoutByIdAction.payload).pipe(
        map((response) => {
          return new RingLayoutsActions.PutRingLayoutByIdSuccess(response as RingLayout);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.PutRingLayoutByIdFail(error));
        })
      );
    })
  );

  // get ring layout by id
  @Effect()
  getRingLayoutByIdStart = this.actions$.pipe(
    ofType(RingLayoutsActions.GET_RINGLAYOUT_BY_ID_START),
    switchMap((getRingLayoutByIdAction: RingLayoutsActions.GetRingLayoutByIdStart) => {
      return this.http.get(this.rootUrl + '/' + getRingLayoutByIdAction.payload).pipe(
        map((response) => {
          return new RingLayoutsActions.GetRingLayoutByIdSuccess(response as RingLayout);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.GetRingLayoutByIdFail(error));
        })
      );
    })
  );

  // delete ring layout by id
  @Effect()
  deleteRingLayoutByIdStart = this.actions$.pipe(
    ofType(RingLayoutsActions.DELETE_RINGLAYOUT_BY_ID_START),
    switchMap((deleteRingLayoutByIdAction: RingLayoutsActions.DeleteRingLayoutByIdStart) => {
      return this.http.delete(this.rootUrl + '/' + deleteRingLayoutByIdAction.payload).pipe(
        map((response) => {
          return new RingLayoutsActions.DeleteRingLayoutByIdSuccess(response as RingLayout);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.DeleteRingLayoutByIdFail(error));
        })
      );
    })
  );

  // upload photo file
  @Effect()
  uploadRingLayoutFile = this.actions$.pipe(
    ofType(RingLayoutsActions.UPLOAD_RINGLAYOUT_FILE_START),
    switchMap((uploadRingLayoutFileAction: RingLayoutsActions.UploadRingLayoutFileStart) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const formData = new FormData();
			formData.append('photo', uploadRingLayoutFileAction.file);

      return this.http.post('http://localhost:3600/api/upload/upload-ring-layout-file', formData, { headers }).pipe(
        map((response) => {
          return new RingLayoutsActions.UploadRingLayoutFileSuccess(response);
        }),
        catchError((error) => {
          return of(new RingLayoutsActions.UploadRingLayoutFileFail(error));
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

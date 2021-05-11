import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as MemberInfosActions from '../actions/memberInfos.actions';
import * as _ from 'lodash';
import { MemberInfo } from '@app/model/memberInfo.model';


@Injectable()
export class MemberInfosEffects {
  rootUrl = 'http://localhost:3600/api/members';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/api/bookmakers';

  // get all member info
  @Effect()
  getMemberInfosStart = this.actions$.pipe(
    ofType(MemberInfosActions.GET_MEMBERINFOS_START),
    switchMap((getMemberInfosAction: MemberInfosActions.GetMemberInfosStart) => {
      return this.http.get(this.rootUrl + '/admin/all').pipe(
        map((response: MemberInfo[]) => {
          const itemsObject = {};
          _.each(response, (item: MemberInfo) => {
            itemsObject[item._id] = item;
          });
          return new MemberInfosActions.GetMemberInfosSuccess(itemsObject, response);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.GetMemberInfosFail(error));
        })
      );
    })
  );

  // create new member info
  @Effect()
  postMemberInfoStart = this.actions$.pipe(
    ofType(MemberInfosActions.POST_MEMBERINFO_START),
    switchMap((postMemberInfoNewAction: MemberInfosActions.PostMemberInfoStart) => {
      return this.http.post(this.rootUrl + '/new', postMemberInfoNewAction.payload).pipe(
        map((response) => {
          return new MemberInfosActions.PostMemberInfoSuccess(response);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.PostMemberInfoFail(error));
        })
      );
    })
  );

  // update member info by id
  @Effect()
  updateMemberInfoStart = this.actions$.pipe(
    ofType(MemberInfosActions.PUT_MEMBERINFO_BY_ID_START),
    switchMap((putMemberInfoByIdAction: MemberInfosActions.PutMemberInfoByIdStart) => {
      return this.http.put(this.rootUrl + '/' + putMemberInfoByIdAction.id, putMemberInfoByIdAction.payload).pipe(
        map((response) => {
          return new MemberInfosActions.PutMemberInfoByIdSuccess(response as MemberInfo);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.PutMemberInfoByIdFail(error));
        })
      );
    })
  );

  // get member info by id
  @Effect()
  getMemberInfoByIdStart = this.actions$.pipe(
    ofType(MemberInfosActions.GET_MEMBERINFO_BY_ID_START),
    switchMap((getMemberInfoByIdAction: MemberInfosActions.GetMemberInfoByIdStart) => {
      return this.http.get(this.rootUrl + '/' + getMemberInfoByIdAction.payload).pipe(
        map((response) => {
          return new MemberInfosActions.GetMemberInfoByIdSuccess(response as MemberInfo);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.GetMemberInfoByIdFail(error));
        })
      );
    })
  );

  // delete member info by id
  @Effect()
  deleteMemberInfoByIdStart = this.actions$.pipe(
    ofType(MemberInfosActions.DELETE_MEMBERINFO_BY_ID_START),
    switchMap((deleteMemberInfoByIdAction: MemberInfosActions.DeleteMemberInfoByIdStart) => {
      return this.http.delete(this.rootUrl + '/' + deleteMemberInfoByIdAction.payload).pipe(
        map((response) => {
          return new MemberInfosActions.DeleteMemberInfoByIdSuccess(response as MemberInfo);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.DeleteMemberInfoByIdFail(error));
        })
      );
    })
  );

  // upload member info file
  @Effect()
  uploadMemberInfoFile = this.actions$.pipe(
    ofType(MemberInfosActions.UPLOAD_MEMBERINFO_FILE_START),
    switchMap((uploadMemberInfoFileAction: MemberInfosActions.UploadMemberInfoFileStart) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const formData = new FormData();
			formData.append('file', uploadMemberInfoFileAction.file);

      return this.http.post('http://localhost:3600/api/upload/upload-member-file', formData, { headers }).pipe(
        map((response) => {
          return new MemberInfosActions.UploadMemberInfoFileSuccess(response);
        }),
        catchError((error) => {
          return of(new MemberInfosActions.UploadMemberInfoFileFail(error));
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as NewslettersActions from '../actions/newsletters.actions';
import * as _ from 'lodash';
import { Newsletter } from '@app/model/newsletter.model';

@Injectable()
export class NewslettersEffects {
  // rootUrl = 'http://localhost:3600/api/newsletters';
  rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/api/newsletters';

  // rootUrl = 'https://api-production.vicbookmakers.com.au/api/newsletters';

  // get all newsletter
  @Effect()
  getNewslettersStart = this.actions$.pipe(
    ofType(NewslettersActions.GET_NEWSLETTERS_START),
    switchMap((getNewslettersAction: NewslettersActions.GetNewslettersStart) => {
      return this.http.get(this.rootUrl + '/all').pipe(
        map((response: Newsletter[]) => {
          const itemsObject = {};
          _.each(response, (item: Newsletter) => {
            itemsObject[item._id] = item;
          });
          return new NewslettersActions.GetNewslettersSuccess(itemsObject, response);
        }),
        catchError((error) => {
          return of(new NewslettersActions.GetNewslettersFail(error));
        })
      );
    })
  );

  // create new newsletter
  @Effect()
  postNewsletterStart = this.actions$.pipe(
    ofType(NewslettersActions.POST_NEWSLETTER_START),
    switchMap((postNewsletterNewAction: NewslettersActions.PostNewsletterStart) => {
      return this.http.post(this.rootUrl + '/new', postNewsletterNewAction.payload).pipe(
        map((response) => {
          return new NewslettersActions.PostNewsletterSuccess(response);
        }),
        catchError((error) => {
          return of(new NewslettersActions.PostNewsletterFail(error));
        })
      );
    })
  );

  // update newsletter by id
  @Effect()
  updateNewsletterStart = this.actions$.pipe(
    ofType(NewslettersActions.PUT_NEWSLETTER_BY_ID_START),
    switchMap((putNewsletterByIdAction: NewslettersActions.PutNewsletterByIdStart) => {
      return this.http.put(this.rootUrl + '/' + putNewsletterByIdAction.id, putNewsletterByIdAction.payload).pipe(
        map((response) => {
          return new NewslettersActions.PutNewsletterByIdSuccess(response as Newsletter);
        }),
        catchError((error) => {
          return of(new NewslettersActions.PutNewsletterByIdFail(error));
        })
      );
    })
  );

  // get newsletter by id
  @Effect()
  getNewsletterByIdStart = this.actions$.pipe(
    ofType(NewslettersActions.GET_NEWSLETTER_BY_ID_START),
    switchMap((getNewsletterByIdAction: NewslettersActions.GetNewsletterByIdStart) => {
      return this.http.get(this.rootUrl + '/' + getNewsletterByIdAction.payload).pipe(
        map((response) => {
          return new NewslettersActions.GetNewsletterByIdSuccess(response as Newsletter);
        }),
        catchError((error) => {
          return of(new NewslettersActions.GetNewsletterByIdFail(error));
        })
      );
    })
  );

  // delete newsletter by id
  @Effect()
  deleteNewsletterByIdStart = this.actions$.pipe(
    ofType(NewslettersActions.DELETE_NEWSLETTER_BY_ID_START),
    switchMap((deleteNewsletterByIdAction: NewslettersActions.DeleteNewsletterByIdStart) => {
      return this.http.delete(this.rootUrl + '/' + deleteNewsletterByIdAction.payload).pipe(
        map((response) => {
          return new NewslettersActions.DeleteNewsletterByIdSuccess(response as Newsletter);
        }),
        catchError((error) => {
          return of(new NewslettersActions.DeleteNewsletterByIdFail(error));
        })
      );
    })
  );

  // upload photo file
  @Effect()
  uploadNewsletterFile = this.actions$.pipe(
    ofType(NewslettersActions.UPLOAD_NEWSLETTER_FILE_START),
    switchMap((uploadNewsletterFileAction: NewslettersActions.UploadNewsletterFileStart) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const formData = new FormData();
      formData.append('photo', uploadNewsletterFileAction.file);

      return this.http
        .post('https://api-registration.vicbookmakers.infusion121.com/api/upload/upload-newsletter-file', formData, {
          headers,
        })
        .pipe(
          map((response) => {
            return new NewslettersActions.UploadNewsletterFileSuccess(response);
          }),
          catchError((error) => {
            return of(new NewslettersActions.UploadNewsletterFileFail(error));
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

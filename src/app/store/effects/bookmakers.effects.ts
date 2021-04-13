import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as BookmakersActions from '../actions/bookmakers.actions';
import * as _ from 'lodash';
import { Bookmaker } from '@app/model/bookmaker.model';

@Injectable()
export class BookmakersEffects {
  rootUrl = 'http://localhost:3000/api/bookmakers';

  // get all jobs
  @Effect()
  getJobsStart = this.actions$.pipe(
    ofType(BookmakersActions.GET_BOOKMAKERS_START),
    switchMap((getJobsAction: BookmakersActions.GetBookmakersStart) => {
      return this.http.get(this.rootUrl + '/all').pipe(
        map((response: Bookmaker[]) => {
          const itemsObject = {};
          _.each(response, (item: Bookmaker) => {
            itemsObject[item._id] = item;
          });
          return new BookmakersActions.GetBookmakersSuccess(itemsObject, response);
        }),
        catchError((error) => {
          return of(new BookmakersActions.GetBookmakersFail(error));
        })
      );
    })
  );

  // create new bookmaker
  @Effect()
  postBookmakerStart = this.actions$.pipe(
    ofType(BookmakersActions.POST_BOOKMAKER_START),
    switchMap((postBookmakerNewAction: BookmakersActions.PostBookmakerStart) => {
      return this.http.post(this.rootUrl + '/new', postBookmakerNewAction.payload).pipe(
        map((response) => {
          return new BookmakersActions.PostBookmakerSuccess(response);
        }),
        catchError((error) => {
          return of(new BookmakersActions.PostBookmakerFail(error));
        })
      );
    })
  );

  // update bookmaker by id
  @Effect()
  updateBookmakerStart = this.actions$.pipe(
    ofType(BookmakersActions.PUT_BOOKMAKER_BY_ID_START),
    switchMap((putBookmakerByIdAction: BookmakersActions.PutBookmakerByIdStart) => {
      return this.http.put(this.rootUrl + '/' + putBookmakerByIdAction.id, putBookmakerByIdAction.payload).pipe(
        map((response) => {
          return new BookmakersActions.PutBookmakerByIdSuccess(response as Bookmaker);
        }),
        catchError((error) => {
          return of(new BookmakersActions.PutBookmakerByIdFail(error));
        })
      );
    })
  );

  // get bookmaker by id
  @Effect()
  getBookmakerByIdStart = this.actions$.pipe(
    ofType(BookmakersActions.GET_BOOKMAKER_BY_ID_START),
    switchMap((getBookmakerByIdAction: BookmakersActions.GetBookmakerByIdStart) => {
      return this.http.get(this.rootUrl + '/' + getBookmakerByIdAction.payload).pipe(
        map((response) => {
          return new BookmakersActions.GetBookmakerByIdSuccess(response as Bookmaker);
        }),
        catchError((error) => {
          return of(new BookmakersActions.GetBookmakerByIdFail(error));
        })
      );
    })
  );

  // delete bookmaker by id
  @Effect()
  deleteBookmakerByIdStart = this.actions$.pipe(
    ofType(BookmakersActions.DELETE_BOOKMAKER_BY_ID_START),
    switchMap((deleteBookmakerByIdAction: BookmakersActions.DeleteBookmakerByIdStart) => {
      return this.http.delete(this.rootUrl + '/' + deleteBookmakerByIdAction.payload).pipe(
        map((response) => {
          return new BookmakersActions.DeleteBookmakerByIdSuccess(response as Bookmaker);
        }),
        catchError((error) => {
          return of(new BookmakersActions.DeleteBookmakerByIdFail(error));
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}

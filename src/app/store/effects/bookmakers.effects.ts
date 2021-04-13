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

  constructor(private actions$: Actions, private http: HttpClient) {}

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
}

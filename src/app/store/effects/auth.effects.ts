import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { User } from '@app/model/user.model';
import * as AuthActions from '../actions/auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthEffects {
  // login
  @Effect()
  loginStart = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((loginAction: AuthActions.LoginStart) => {
      return this.afAuth.auth
        .signInWithEmailAndPassword(loginAction.username, loginAction.password)
        .then((response: any) => {
          console.log('Response ' + JSON.stringify(response));
          console.log('user id ' + response.user.uid + 'response email' + response.user.email);
          let user = new User(response.user.uid, response.user.email);
          console.log('This is the login user ' + JSON.stringify(user));
          return new AuthActions.LoginSuccess(user as User);
        })
        .catch((error: any) => {
          console.log('This is the error ' + error);
          return new AuthActions.LoginFail(error);
        });
    })
  );

  constructor(private actions$: Actions, private afAuth: AngularFireAuth) {}
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  errorMessage: string;
  errorMessageUpdated = new Subject<string>();
  userCreated = new Subject<boolean>();
  userCreatedEmail = new Subject<string>();

  userCreatedFacebookName = new Subject<string>();

  pageRedirected = false;
  user: firebase.User;
  tokenId: string;
  userData: any; // Save logged in user data

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
      }
    });

    this.afAuth.idToken.subscribe((result) => {
      this.tokenId = result;
      //console.log("This is id Token : " + this.tokenId);
    });
  }

  get authenticated(): boolean {
    //console.log(this.user);
    return this.user ? true : false;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  getPageRedirectStatus() {
    return this.pageRedirected;
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }

  logOutUser() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigateByUrl('/login');
    });
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    console.log(email + ' and ' + password);
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        console.log('This is the login user ' + JSON.stringify(result));
        this.errorMessage = '';
        this.router.navigate(['/admin/dashboard']);
      })
      .catch((error: any) => {
        console.log('This is the error ' + error);

        this.errorMessage = error.message;
        this.errorMessageUpdated.next(this.errorMessage);
      });
  }

  sendResetPasswordLink(emailAddress: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(emailAddress)
      .then((result: any) => {
        this.errorMessage = 'Reset link sent';
        this.errorMessageUpdated.next(this.errorMessage);
      })
      .catch((error: any) => {
        this.errorMessage = error;
        this.errorMessageUpdated.next(this.errorMessage);
      });
  }
}

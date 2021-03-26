import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/actions/auth.actions';
import { Subject } from 'rxjs';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.login.loading || !!state.currentUser.loading) {
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }

        // redirect user if user's authenticated
        if (!state.login.loading && state.currentUser.user !== null && state.login.error === null) {
          this.router.navigate(['admin/dashboard']);
        } else if (!state.login.loading && state.login.error !== null) {
          this.error = state.login.error;
        }
      });

    if (this.authenticationService.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    this.authenticationService.errorMessageUpdated.subscribe(() => {
      this.isLoading = false;
      this.error = this.authenticationService.getErrorMessage();
      console.log('I am the error of the game ' + this.error);
    });
  }

  login() {
    // this.isLoading = true;
    // const login$ = this.authenticationService
    //   .signIn(this.loginForm.value.username, this.loginForm.value.password)
    //   .then((result: any) => {
    //     this.error = this.authenticationService.errorMessage;
    //     this.isLoading = false;
    //   });

    this.store.dispatch(new AuthActions.LoginStart(this.loginForm.value.username, this.loginForm.value.password));
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

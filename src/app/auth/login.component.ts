import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
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
    this.isLoading = true;
    const login$ = this.authenticationService
      .signIn(this.loginForm.value.username, this.loginForm.value.password)
      .then((result: any) => {
        this.error = this.authenticationService.errorMessage;
        this.isLoading = false;
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  ngOnDestroy() {}
}

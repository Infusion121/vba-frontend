import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store
      .select('auth', 'logout')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.authenticationService.logOutUser();
          this.store.dispatch(new AuthActions.LogoutEnd());
          this.router.navigate(['/login']);
        }
      });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.store.dispatch(new AuthActions.LogoutStart());
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}

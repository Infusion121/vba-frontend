import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmaker } from '@app/model/bookmaker.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import * as fromApp from '../store/app.reducer';
import * as BookmakersActions from '../store/actions/bookmakers.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookmaker-new',
  templateUrl: './bookmaker-new.component.html',
  styleUrls: ['./bookmaker-new.component.scss'],
})
export class BookmakerNewComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  bookmakerNewForm: FormGroup;
  submitted = false;
  submittedSuccess = false;
  bookmaker: Bookmaker;

  serviceOptions = ['Internet', 'Phone', 'On Course'];
  betOptions = ['Sports', 'Thoroughbred', 'Harness', 'Greyhounds', 'Futures'];

  constructor(private _fb: FormBuilder, private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.populateForm();

    // this.store
    //   .select('auth', 'currentUser', 'item')
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe((state) => {
    //     if (state && state !== null) {
    //       this.currentUser = state;
    //     }
    //   });

    this.store
      .select('bookmakers', 'bookmakerNew')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        // if (state.error !== null) {
        //   this.messageService.showError(state.error);
        // }

        if (state.item !== null && state.loading === false && state.error === null) {
          // this.messageService.showSuccess('', 'User has been created');
          this.store.dispatch(new BookmakersActions.ResetPostBookmakerState());
          this.router.navigateByUrl('/users/list');
        }
      });
  }

  populateForm() {
    this.bookmakerNewForm = this._fb.group({
      bookmakingEntityName: ['', [Validators.required]],
      aboutUs: [''],
      contactName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactNumber: [''],
      bookmakingServices: [[]],
      betTypes: [[]],
      websiteAddress: [''],
      licenseNumber: ['', [Validators.required]],
      yearEstablished: [''],
      profilePicCompanyLogo: [''],
      telephoneBetting: [''],
      blockIt: ['', [this.validatorHoneyPot]],
    });
  }

  validatorHoneyPot(control: FormControl): { [s: string]: boolean } {
    if (control.value !== '') {
      return { foundBot: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.bookmakerNewForm);
    if (this.bookmakerNewForm.invalid) {
      return;
    } else {
      const formValue = this.bookmakerNewForm.value;
      const postObj = { ...formValue };

      console.log(postObj);
      this.store.dispatch(new BookmakersActions.PostBookmakerStart(postObj));
    }
  }

  onServiceTypeChange(index: number, event: any) {
    const currentServiceTypes = this.bookmakerNewForm.value.bookmakingServices
      ? this.bookmakerNewForm.value.bookmakingServices
      : [];

    if (!!event.target.checked) {
      currentServiceTypes.push(event.target.value);
    } else {
      _.remove(currentServiceTypes, (value) => {
        return value === event.target.value;
      });
    }

    this.bookmakerNewForm.patchValue({
      bookmakingServices: currentServiceTypes,
    });
  }

  onBetTypeChange(index: number, event: any) {
    const currentBetTypes = this.bookmakerNewForm.value.betTypes
      ? this.bookmakerNewForm.value.betTypes
      : [];

    if (!!event.target.checked) {
      currentBetTypes.push(event.target.value);
    } else {
      _.remove(currentBetTypes, (value) => {
        return value === event.target.value;
      });
    }

    this.bookmakerNewForm.patchValue({
      betTypes: currentBetTypes,
    });
  }

  resetForm() {
    this.submittedSuccess = false;
    this.submitted = false;
    this.bookmakerNewForm.reset();
    this.populateForm();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmaker } from '@app/model/bookmaker.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as BookmakersActions from '../../../store/actions/bookmakers.actions';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.scss'],
})
export class BookmakerComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  bookmakerId: string = null;
  bookmakerForm: FormGroup;
  isFormDirty = false;
  bookmaker: Bookmaker = null;
  loading = false;
  submitted = false;
  submittedSuccess = false;

  constructor(
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private _fb: FormBuilder,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.bookmakerForm = this._fb.group({
      bookmakingEntityName: ['', [Validators.required]],
      aboutUs: [''],
      contactName: ['', [Validators.required]],
      contactemail: ['', [Validators.required, Validators.email]],
      contactNumber: [''],
      bookmakingServices: [[]],
      betTypes: [[]],
      websiteAddress: [''],
      licenseNumber: ['', [Validators.required]],
      yearEstablished: [''],
      profilePicCompanyLogo: [''],
      bettingPhoneLine: [''],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    // get the bookmaker id from router url
    this.currentRoute.params.subscribe((params) => {
      this.bookmakerId = params.bid;
      this.store.dispatch(new BookmakersActions.GetBookmakerByIdStart(this.bookmakerId));
    });

    // subscribe to bookmaker state and wait for data to populate in the bookmaker form
    this.store
      .select('bookmakers', 'bookmakerCurrent')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading || !!state.update.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        // show error when load user by id fail
        // if (state.error !== null) {
        //   this.messageService.showError(state.error);
        // }

        // show error when update user by id fail
        // if (state.update.error !== null) {
        //   this.messageService.showError(state.update.error);
        // }

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.bookmaker = state.item;
          this.titleService.setTitle('Bookmaker - ' + state.item.bookmakingEntityName);

          this.populateForm(state.item);
          if (state.update.item === null) {
            // this.messageService.showSuccess('', 'User (' + state.item.username + ') has been loaded');
          } else {
            // this.messageService.showSuccess('', 'User (' + state.item.username + ') has been updated');

            // this.router.navigateByUrl('/users/list');
            this.store.dispatch(new BookmakersActions.ResetBookmakerCurrentState());
            this.store.dispatch(new BookmakersActions.GetBookmakerByIdStart(this.bookmakerId));
          }
        }
      });
  }

  validatorHoneyPot(control: FormControl): { [s: string]: boolean } {
    if (control.value !== '') {
      return { foundBot: true };
    }
    return null;
  }

  populateForm(bookmaker: Bookmaker) {
    this.bookmakerForm = this._fb.group({
      bookmakingEntityName: bookmaker.bookmakingEntityName,
      aboutUs: bookmaker.aboutUs,
      contactName: bookmaker.contactName,
      contactemail: bookmaker.contactEmail,
      contactNumber: bookmaker.contactNumber,
      bookmakingServices: bookmaker.bookmakingServices,
      betTypes: bookmaker.betTypes,
      websiteAddress: bookmaker.websiteAddress,
      licenseNumber: bookmaker.licenseNumber,
      yearEstablished: bookmaker.yearEstablished,
      profilePicCompanyLogo: bookmaker.profilePicCompanyLogo,
      telephoneBetting: bookmaker.telephoneBetting,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookmakerForm.invalid) {
      return;
    } else {
      const postObj = this.bookmakerForm.value;

      if (!_.isEmpty(postObj)) {
        this.store.dispatch(new BookmakersActions.PutBookmakerByIdStart(postObj, this.bookmaker._id));
      }
    }
  }

  resetForm() {
    this.submittedSuccess = false;
    this.submitted = false;
    this.bookmakerForm.patchValue({
      bookmakingEntityName: this.bookmaker.bookmakingEntityName,
      aboutUs: this.bookmaker.aboutUs,
      contactName: this.bookmaker.contactName,
      contactemail: this.bookmaker.contactEmail,
      contactNumber: this.bookmaker.contactNumber,
      bookmakingServices: this.bookmaker.bookmakingServices,
      betTypes: this.bookmaker.betTypes,
      websiteAddress: this.bookmaker.websiteAddress,
      licenseNumber: this.bookmaker.licenseNumber,
      yearEstablished: this.bookmaker.yearEstablished,
      profilePicCompanyLogo: this.bookmaker.profilePicCompanyLogo,
      telephoneBetting: this.bookmaker.telephoneBetting,
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

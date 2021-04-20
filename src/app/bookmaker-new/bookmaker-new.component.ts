import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmaker } from '@app/model/bookmaker.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import * as fromApp from '../store/app.reducer';
import * as BookmakersActions from '../store/actions/bookmakers.actions';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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

  showThankyouMessage: boolean = false;
  bookmakingEntityName: string;

  constructor(
    private _fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

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
          this.showThankyouMessage = true;
          //this.router.navigateByUrl('/users/list');
        }
      });

    this.store
      .select('bookmakers', 'uploadBookmakerPhotoFiles')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (state.items !== null && state.loading === false && state.error === null) {
          const formValues = { ...this.bookmakerNewForm.value };

          _.each(state.items, (stateItem) => {
            _.each(formValues.profilePicCompanyLogo, (formItem) => {
              // TODO: Nice to have - find another way to add url
              // because might be chances that images with same name can be uploaded.
              if (stateItem.originalname === formItem.name) {
                formItem.url = stateItem.path;
              }
            });
          });

          const postObj = formValues;
          postObj.createdOn = new Date().getTime();
          postObj.isApproved = false;
          console.log(postObj);
          this.store.dispatch(new BookmakersActions.PostBookmakerStart(postObj));
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
      profilePicCompanyLogo: this._fb.array([]),
      telephoneBetting: this._fb.array([
        this._fb.group({
          telephone: '',
        }),
      ]),
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
      this.bookmakingEntityName = this.bookmakerNewForm.value.bookmakingEntityName;
      const postObj: any[] = [];
      _.each(this.bookmakerNewForm.value.profilePicCompanyLogo, (item) => {
        postObj.push(item.file);
      });

      //upload the images first
      this.store.dispatch(new BookmakersActions.UploadPhotosStart(postObj));
    }
  }

  onFilesChange(event: any) {
    const files = (event.target as HTMLInputElement).files;
    const control = this.bookmakerNewForm.get('profilePicCompanyLogo') as FormArray;
    _.each(files, (file) => {
      control.push(
        this._fb.group({
          name: [file.name, Validators.required],
          url: [this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file))],
          file: [file],
        })
      );
    });
  }

  removeFile(index: number) {
    const control = this.bookmakerNewForm.get('profilePicCompanyLogo') as FormArray;
    control.removeAt(index);
  }

  addBettingPhone() {
    const control = this.bookmakerNewForm.get('telephoneBetting') as FormArray;
    control.push(
      this._fb.group({
        telephone: '',
      })
    );
  }

  removeBettingPhone(index: number) {
    const control = this.bookmakerNewForm.get('telephoneBetting') as FormArray;
    control.removeAt(index);
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
    const currentBetTypes = this.bookmakerNewForm.value.betTypes ? this.bookmakerNewForm.value.betTypes : [];

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

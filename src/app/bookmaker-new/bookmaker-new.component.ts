import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-bookmaker-new',
  templateUrl: './bookmaker-new.component.html',
  styleUrls: ['./bookmaker-new.component.scss'],
})
export class BookmakerNewComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  componentDestroyed$: Subject<boolean> = new Subject();
  bookmakerNewForm: FormGroup;
  submitted = false;
  submittedSuccess = false;
  bookmaker: Bookmaker;

  serviceOptions = ['Internet', 'Phone', 'On Course'];
  betOptions = ['Sports', 'Thoroughbred', 'Harness', 'Greyhounds', 'Futures'];

  showThankyouMessage = false;
  bookmakingEntityName: string;
  remainingText = 250;
  fileUploadError = false;
  fileUploadErrorMessage = '';

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private _fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.populateForm();

    this.store
      .select('bookmakers', 'bookmakerNew')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (state.item !== null && state.loading === false && state.error === null) {
          this.showThankyouMessage = true;
          this.store.dispatch(new BookmakersActions.ResetPostBookmakerState());
          this.blockUI.stop();
        }
      });

    this.store
      .select('bookmakers', 'uploadBookmakerPhotoFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (state.item !== null && state.loading === false && state.error === null) {
          this.bookmakerNewForm.patchValue({
            profilePicCompanyLogo: state.item.path,
            profilePicCompanyLogoObj: null,
          });

          const postObj = { ...this.bookmakerNewForm.value };
          postObj.createdOn = new Date().getTime();
          postObj.isApproved = false;

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
      contactNumber: ['', [Validators.pattern(/^\(\d{4}\)\s\d{3}-\d{3}$/), Validators.required]],
      bookmakingServices: [[]],
      betTypes: [[]],
      websiteAddress: [''],
      licenseNumber: ['', [Validators.required]],
      yearEstablished: [''],
      profilePicCompanyLogo: ['', Validators.required],
      profilePicCompanyLogoObj: [null],
      telephoneBetting: this._fb.array([
        this._fb.group({
          telephone: '',
        }),
      ]),
      blockIt: ['', [this.validatorHoneyPot]],
    });

    this.bookmakerNewForm.get('aboutUs').valueChanges.subscribe((x) => {
      this.remainingText = 250 - x.length;
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
    const photoControl = this.bookmakerNewForm.get('profilePicCompanyLogo') as FormArray;

    if (
      this.bookmakerNewForm.invalid ||
      this.fileUploadError ||
      this.bookmakerNewForm.value.profilePicCompanyLogoObj === null
    ) {
      if (this.bookmakerNewForm.value.profilePicCompanyLogoObj === null) {
        this.fileUploadError = true;
        this.fileUploadErrorMessage = 'Please select a file.';
      }
      return;
    } else {
      this.blockUI.start();
      // this.bookmakingEntityName = this.bookmakerNewForm.value.bookmakingEntityName;
      // const postObj: any[] = [];
      // _.each(this.bookmakerNewForm.value.profilePicCompanyLogo, (item) => {
      //   postObj.push(item.file);
      // });

      // upload the image first
      this.store.dispatch(new BookmakersActions.UploadPhotoStart(this.bookmakerNewForm.value.profilePicCompanyLogoObj));
    }
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bookmakerNewForm.patchValue({
      profilePicCompanyLogo: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file)),
      profilePicCompanyLogoObj: file,
    });

    this.bookmakerNewForm.get('profilePicCompanyLogoObj').markAsDirty();

    // validate
    const fileExtension = file.name.split('.').pop().toLocaleLowerCase();
    // console.log('File Size ' + file.size);
    if (
      (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') &&
      file.size <= 5000000
    ) {
      this.fileUploadError = false;
      this.fileUploadErrorMessage = '';
    } else {
      this.fileUploadError = true;
      if (file.size > 5000000) {
        this.fileUploadErrorMessage = 'File size must be 5MB or less.';
      } else {
        this.fileUploadErrorMessage = 'Invalid file selected. Please select a valid file.';
      }
    }
  }

  removeFile() {
    // const control = this.bookmakerNewForm.get('profilePicCompanyLogo') as FormArray;
    // control.removeAt(index);
    this.bookmakerNewForm.patchValue({
      profilePicCompanyLogo: '',
      profilePicCompanyLogoObj: null,
    });

    this.fileInputRef.nativeElement.value = '';
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

    this.fileInputRef.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

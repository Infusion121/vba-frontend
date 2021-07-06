import { Component, ElementRef, OnDestroy, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmaker } from '@app/model/bookmaker.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as BookmakersActions from '../../../store/actions/bookmakers.actions';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.scss'],
})
export class BookmakerComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputRef') fileInputRef: ElementRef;
  //rootUrl = 'http://localhost:3600';
  //rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';
  rootUrl = 'http://api-production.vicbookmakers.com.au';

  componentDestroyed$: Subject<boolean> = new Subject();

  bookmakerId: string = null;
  bookmakerForm: FormGroup;
  isFormDirty = false;
  bookmaker: Bookmaker = null;
  loading = false;
  submitted = false;
  submittedSuccess = false;

  serviceOptions = ['Internet', 'Phone', 'On Course'];
  betOptions = ['Sports', 'Thoroughbred', 'Harness', 'Greyhounds', 'Futures'];

  fileUploadError = false;
  fileUploadErrorMessage = '';

  remainingText = 250;

  constructor(
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private _fb: FormBuilder,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.bookmakerForm = this._fb.group({
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
      telephoneBetting: this._fb.array([]),
      isApproved: [false, Validators.required],
      // isFeatured: [false, Validators.required],
      isOnlineFeatured: [false, Validators.required],
      isTelephoneFeatured: [false, Validators.required],
      isOnCourseFeatured: [false, Validators.required],
      isSportsFeatured: [false, Validators.required],
      isActive: [true, Validators.required],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    // get the bookmaker id from router url
    this.currentRoute.params.subscribe((params) => {
      if (params.bid !== undefined) {
        this.bookmakerId = params.bid;
        this.store.dispatch(new BookmakersActions.GetBookmakerByIdStart(this.bookmakerId));
      }
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

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.bookmaker = state.item;
          this.titleService.setTitle('Bookmaker - ' + state.item.bookmakingEntityName);
          this.populateForm(state.item);

          if (state.update.item === null) {
          } else {
            this.store.dispatch(new BookmakersActions.ResetBookmakerCurrentState());
            this.router.navigateByUrl('/admin/bookmakers');

            // this.store.dispatch(new BookmakersActions.GetBookmakerByIdStart(this.bookmakerId));
          }
        }
      });

    //Subscribe for adding new bookmaker via admin portal
    this.store
      .select('bookmakers', 'bookmakerNew')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (state.item !== null && state.loading === false && state.error === null) {
          this.submitted = false;
          this.loading = false;
          this.store.dispatch(new BookmakersActions.ResetBookmakerCurrentState());
          this.store.dispatch(new BookmakersActions.ResetPostBookmakerState());
          this.router.navigateByUrl('/admin/bookmakers');
        }
      });

    // subscribe to upload profile logo file state to be ready for saving / updating
    this.store
      .select('bookmakers', 'uploadBookmakerPhotoFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          this.bookmakerForm.patchValue({
            profilePicCompanyLogo: state.item.path,
            profilePicCompanyLogoObj: null,
          });

          // save the rest of the form
          this.onSubmit();
        }
      });

    this.bookmakerForm.get('aboutUs').valueChanges.subscribe((x) => {
      this.remainingText = 250 - x.length;
    });

    // console.log('SUbmitted ' + this.submitted);
  }

  validatorHoneyPot(control: FormControl): { [s: string]: boolean } {
    if (control.value !== '') {
      return { foundBot: true };
    }
    return null;
  }

  populateForm(bookmaker: Bookmaker) {
    this.bookmakerForm.patchValue({
      bookmakingEntityName: bookmaker.bookmakingEntityName,
      aboutUs: bookmaker.aboutUs,
      contactName: bookmaker.contactName,
      contactEmail: bookmaker.contactEmail,
      contactNumber: bookmaker.contactNumber,
      bookmakingServices: bookmaker.bookmakingServices,
      betTypes: bookmaker.betTypes,
      websiteAddress: bookmaker.websiteAddress,
      licenseNumber: bookmaker.licenseNumber,
      yearEstablished: bookmaker.yearEstablished,
      profilePicCompanyLogo: bookmaker.profilePicCompanyLogo,
      profilePicCompanyLogoObj: null,
      isApproved: bookmaker.isApproved,
      // isFeatured: bookmaker.isFeatured,
      isOnlineFeatured: bookmaker.isOnlineFeatured || false,
      isTelephoneFeatured: bookmaker.isTelephoneFeatured || false,
      isOnCourseFeatured: bookmaker.isOnCourseFeatured || false,
      isSportsFeatured: bookmaker.isSportsFeatured || false,
      isActive: bookmaker.isActive,
    });

    // loop through telephonebetting and patchvalue
    const control = this.bookmakerForm.get('telephoneBetting') as FormArray;
    if (bookmaker.telephoneBetting && bookmaker.telephoneBetting.length > 0) {
      _.each(bookmaker.telephoneBetting, (telephoneBetting) => {
        control.push(
          this._fb.group({
            telephone: telephoneBetting.telephone,
          })
        );
      });
    }
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.bookmakerForm.patchValue({
      profilePicCompanyLogo: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file)),
      profilePicCompanyLogoObj: file,
    });

    this.bookmakerForm.get('profilePicCompanyLogoObj').markAsDirty();

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

  cancelFile() {
    this.bookmakerForm.patchValue({
      profilePicCompanyLogoObj: null,
    });

    this.fileInputRef.nativeElement.value = '';
  }

  addBettingPhone() {
    const control = this.bookmakerForm.get('telephoneBetting') as FormArray;
    control.push(
      this._fb.group({
        telephone: '',
      })
    );
  }

  removeBettingPhone(index: number) {
    const control = this.bookmakerForm.get('telephoneBetting') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    // console.log('I am getting submitted');
    this.submitted = true;
    // console.log(this.bookmakerForm.value);
    if (this.bookmakerForm.invalid) {
      if (this.bookmakerForm.value.profilePicCompanyLogo === '') {
        this.fileUploadError = true;
        this.fileUploadErrorMessage = 'Please select a file.';
      } else {
        this.fileUploadError = false;
        this.fileUploadErrorMessage = '';
      }
      return;
    } else {
      const postObj = this.bookmakerForm.value;

      if (postObj.profilePicCompanyLogoObj !== null) {
        // upload the file
        this.store.dispatch(new BookmakersActions.UploadPhotoStart(postObj.profilePicCompanyLogoObj));
        // after uploaded the file, listen to it from store state and trigger the onsubmit again with image file data updated in the form data.
      } else {
        // updating bookmaker
        if (this.bookmaker !== null) {
          if (!_.isEmpty(postObj)) {
            this.store.dispatch(new BookmakersActions.PutBookmakerByIdStart(postObj, this.bookmaker._id));
          }
        } else {
          // creating new bookmaker
          postObj.createdOn = new Date().getTime();
          this.store.dispatch(new BookmakersActions.PostBookmakerStart(postObj));
        }
      }
    }
  }

  onServiceTypeChange(index: number, event: any) {
    const currentServiceTypes = this.bookmakerForm.value.bookmakingServices
      ? _.clone(this.bookmakerForm.value.bookmakingServices)
      : [];

    if (!!event.target.checked) {
      currentServiceTypes.push(event.target.value);
    } else {
      _.remove(currentServiceTypes, (value) => {
        return value === event.target.value;
      });
    }

    this.bookmakerForm.patchValue({
      bookmakingServices: currentServiceTypes,
    });
  }

  onBetTypeChange(index: number, event: any) {
    const currentBetTypes = this.bookmakerForm.value.betTypes ? _.clone(this.bookmakerForm.value.betTypes) : [];

    if (!!event.target.checked) {
      currentBetTypes.push(event.target.value);
    } else {
      _.remove(currentBetTypes, (value) => {
        return value === event.target.value;
      });
    }

    this.bookmakerForm.patchValue({
      betTypes: currentBetTypes,
    });
  }

  resetForm() {
    this.submittedSuccess = false;
    this.submitted = false;
    this.bookmakerForm.patchValue({
      bookmakingEntityName: this.bookmaker.bookmakingEntityName,
      aboutUs: this.bookmaker.aboutUs,
      contactName: this.bookmaker.contactName,
      contactEmail: this.bookmaker.contactEmail,
      contactNumber: this.bookmaker.contactNumber,
      bookmakingServices: this.bookmaker.bookmakingServices,
      betTypes: this.bookmaker.betTypes,
      websiteAddress: this.bookmaker.websiteAddress,
      licenseNumber: this.bookmaker.licenseNumber,
      yearEstablished: this.bookmaker.yearEstablished,
      profilePicCompanyLogo: this.bookmaker.profilePicCompanyLogo,
      profilePicCompanyLogoObj: null,
      telephoneBetting: this.bookmaker.telephoneBetting,
      isApproved: this.bookmaker.isApproved,
      // isFeatured: this.bookmaker.isFeatured,
      isOnlineFeatured: this.bookmaker.isOnlineFeatured || false,
      isTelephoneFeatured: this.bookmaker.isTelephoneFeatured || false,
      isOnCourseFeatured: this.bookmaker.isOnCourseFeatured || false,
      isSportsFeatured: this.bookmaker.isSportsFeatured || false,
      isActive: this.bookmaker.isActive,
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new BookmakersActions.ResetBookmakerCurrentState());
    this.store.dispatch(new BookmakersActions.ResetUploadPhotoState());
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as InfoSheetsActions from '../../../store/actions/infoSheets.actions';
import { InfoSheet } from '@app/model/infoSheet.model';

@Component({
  selector: 'app-info-sheet',
  templateUrl: './info-sheet.component.html',
  styleUrls: ['./info-sheet.component.scss'],
})
export class InfoSheetComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  // rootUrl = 'http://localhost:3600/';
  rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/';
  //rootUrl = 'https://api-production.vicbookmakers.com.au/';
  componentDestroyed$: Subject<boolean> = new Subject();

  infoSheetId: any = null;
  infoSheet: InfoSheet = null;
  isEditMode = false;
  infoSheetForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.infoSheetForm = this._fb.group({
      description: ['', [Validators.required]],
      subject: [''],
      file: ['', [Validators.required]],
      fileObj: [null],
      isActive: [true, [Validators.required]],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    // get the info sheet id from router url
    this.currentRoute.params.subscribe((params) => {
      if (params.sid !== undefined) {
        this.infoSheetId = params.sid;
        this.store.dispatch(new InfoSheetsActions.GetInfoSheetByIdStart(this.infoSheetId));
        this.isEditMode = true;
      }
    });

    // subscribe to infosheet state and wait for data to populate in the form
    this.store
      .select('infoSheets', 'infoSheetCurrent')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading || !!state.update.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.infoSheet = state.item;
          this.titleService.setTitle('RVL Info Sheet - ' + state.item.description);
          this.populateForm(state.item);
          if (state.update.item !== null) {
            this.store.dispatch(new InfoSheetsActions.ResetInfoSheetCurrentState());
            this.router.navigateByUrl('/admin/info-sheets');
          }
        }
      });

    // subscribe to upload info sheet file state to be ready for saving / updating info
    this.store
      .select('infoSheets', 'uploadInfoSheetFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          const imageUrl = state.item.path;
          this.infoSheetForm.patchValue({
            file: state.item.path,
            fileObj: null,
          });

          // save the rest of the form
          this.onSubmit();
        }
      });

    // after creating new info sheet
    this.store
      .select('infoSheets', 'infoSheetNew')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          this.store.dispatch(new InfoSheetsActions.ResetPostInfoSheetState());
          this.router.navigateByUrl('/admin/info-sheets');
        }
      });
  }

  populateForm(infoSheet: InfoSheet) {
    this.infoSheetForm.patchValue({
      description: infoSheet.description,
      subject: infoSheet.subject,
      file: infoSheet.file,
      isActive: infoSheet.isActive,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.infoSheetForm.invalid) {
      return;
    } else {
      const postObj = { ...this.infoSheetForm.value };

      if (postObj.fileObj !== null) {
        // upload the file
        this.store.dispatch(new InfoSheetsActions.UploadInfoSheetFileStart(postObj.fileObj));
        // after uploaded the file, listen to it from store state and trigger the onsubmit again with image file data updated in the form data.
      } else {
        // updating info sheet
        if (this.infoSheet !== null) {
          if (!_.isEmpty(postObj)) {
            this.store.dispatch(new InfoSheetsActions.PutInfoSheetByIdStart(postObj, this.infoSheet._id));
          }
        } else {
          // creating info sheet
          postObj.createdOn = new Date().getTime();
          this.store.dispatch(new InfoSheetsActions.PostInfoSheetStart(postObj));
        }
      }
    }
  }

  validatorHoneyPot(control: FormControl): { [s: string]: boolean } {
    if (control.value !== '') {
      return { foundBot: true };
    }
    return null;
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.infoSheetForm.patchValue({
      file: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file)),
      fileObj: file,
    });

    this.infoSheetForm.get('fileObj').markAsDirty();
  }

  resetForm() {
    this.submitted = false;
    if (this.infoSheetId !== null && this.infoSheet !== null) {
      this.infoSheetForm.patchValue({
        description: this.infoSheet.description,
        subject: this.infoSheet.subject,
        file: this.infoSheet.file,
        fileObj: null,
        isActive: this.infoSheet.isActive,
        blockIt: '',
      });
    } else {
      this.infoSheetForm.patchValue({
        description: '',
        subject: '',
        file: '',
        fileObj: null,
        isActive: '',
        blockIt: '',
      });
    }

    this.fileInputRef.nativeElement.value = '';
  }

  removeFile() {
    if (!!this.isEditMode) {
      this.infoSheetForm.patchValue({
        file: this.infoSheet.file,
        fileObj: null,
      });
    } else {
      this.infoSheetForm.patchValue({
        file: '',
        fileObj: null,
      });
    }

    this.fileInputRef.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.store.dispatch(new InfoSheetsActions.ResetInfoSheetCurrentState());
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

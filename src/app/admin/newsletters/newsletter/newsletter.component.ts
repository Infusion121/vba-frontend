import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as NewslettersActions from '../../../store/actions/newsletters.actions';
import { Newsletter } from '@app/model/newsletter.model';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputRef') fileInputRef: ElementRef;

  rootUrl = 'http://localhost:3600/';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';
  componentDestroyed$: Subject<boolean> = new Subject();

  newsletterId: any = null;
  newsletter: Newsletter = null;
  isEditMode = false;
  newsletterForm: FormGroup;
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
    this.newsletterForm = this._fb.group({
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      dateObj: [null, [Validators.required]],
      file: ['', [Validators.required]],
      fileObj: [null],
      isActive: [true, [Validators.required]],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    this.onDateChange();

    // get the newsletter id from router url
    this.currentRoute.params.subscribe((params) => {
      if (params.nid !== undefined) {
        this.newsletterId = params.nid;
        this.store.dispatch(new NewslettersActions.GetNewsletterByIdStart(this.newsletterId));
        this.isEditMode = true;
      }
    });

    // subscribe to newsletter state and wait for data to populate in the form
    this.store
      .select('newsletters', 'newsletterCurrent')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading || !!state.update.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.newsletter = state.item;
          this.titleService.setTitle('Newsletter - ' + state.item.description);
          this.populateForm(state.item);
          // updating newsletter
          if (state.update.item !== null) {
            this.store.dispatch(new NewslettersActions.ResetNewsletterCurrentState());
            this.router.navigateByUrl('/admin/newsletters');
          }
        }
      });

    // subscribe to upload file state to be ready for saving / updating info
    this.store
      .select('newsletters', 'uploadNewsletterFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          this.newsletterForm.patchValue({
            file: state.item.path,
            fileObj: null,
          });

          // save the rest of the form
          this.onSubmit();
        }
      });

    // after creating new newsletter
    this.store
      .select('newsletters', 'newsletterNew')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          this.store.dispatch(new NewslettersActions.ResetPostNewsletterState());
          this.router.navigateByUrl('/admin/newsletters');
        }
      });
  }

  populateForm(newsletter: Newsletter) {
    this.newsletterForm.patchValue({
      description: newsletter.description,
      date: newsletter.date,
      dateObj: this.convertDateToDateObj(newsletter.date),
      file: newsletter.file,
      isActive: newsletter.isActive,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.newsletterForm.invalid) {
      return;
    } else {
      const postObj = { ...this.newsletterForm.value };

      if (postObj.fileObj !== null) {
        // upload the file
        this.store.dispatch(new NewslettersActions.UploadNewsletterFileStart(postObj.fileObj));
        // after uploaded the file, listen to it from store state
        // and trigger the onsubmit again with image file data updated in the form data.
      } else {
        // updating newsletter
        if (this.newsletter !== null) {
          if (!_.isEmpty(postObj)) {
            this.store.dispatch(new NewslettersActions.PutNewsletterByIdStart(postObj, this.newsletter._id));
          }
        } else {
          // creating newsletter
          postObj.createdOn = new Date().getTime();
          this.store.dispatch(new NewslettersActions.PostNewsletterStart(postObj));
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
    this.newsletterForm.patchValue({
      file: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file)),
      fileObj: file,
    });
    this.newsletterForm.get('fileObj').markAsDirty();
  }

  onDateChange() {
    // whenever date change
    this.newsletterForm.get('dateObj').valueChanges.subscribe((newDateObj) => {
      const dateObj = this.newsletterForm.get('dateObj').value;
      if (dateObj !== null) {
        const date = Math.floor(new Date(newDateObj.year, newDateObj.month - 1, newDateObj.day).getTime()) / 1000;
        this.newsletterForm.patchValue({ date });
      }
    });
  }

  resetForm() {
    this.submitted = false;
    if (this.newsletterId !== null && this.newsletter !== null) {
      this.newsletterForm.patchValue({
        description: this.newsletter.description,
        date: this.newsletter.date,
        dateObj: this.convertDateToDateObj(this.newsletter.date),
        file: this.newsletter.file,
        fileObj: null,
        isActive: this.newsletter.isActive,
        blockIt: '',
      });
    } else {
      this.newsletterForm.patchValue({
        description: '',
        date: '',
        dateObj: null,
        file: '',
        fileObj: null,
        isActive: '',
        blockIt: '',
      });
    }

    this.fileInputRef.nativeElement.value = '';
  }

  convertDateToDateObj(date: any) {
    const miliSeconds = date * 1000;
    const dateObject = new Date(miliSeconds);
    return {
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      day: dateObject.getDate(),
    };
  }

  removeFile() {
    if (!!this.isEditMode) {
      this.newsletterForm.patchValue({
        file: this.newsletter.file,
        fileObj: null,
      });
    } else {
      this.newsletterForm.patchValue({
        file: '',
        fileObj: null,
      });
    }

    this.fileInputRef.nativeElement.value = '';
  }

  ngOnDestroy() {
    this.store.dispatch(new NewslettersActions.ResetNewsletterCurrentState());
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

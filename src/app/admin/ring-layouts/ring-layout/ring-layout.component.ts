import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as RingLayoutsActions from '../../../store/actions/ringLayouts.actions';
import { RingLayout } from '@app/model/ringLayout.model';

@Component({
  selector: 'app-ring-layout',
  templateUrl: './ring-layout.component.html',
  styleUrls: ['./ring-layout.component.scss']
})
export class RingLayoutComponent implements OnInit, OnDestroy {
  rootUrl = 'http://localhost:3600';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';
  componentDestroyed$: Subject<boolean> = new Subject();

  ringLayoutId: any = null;
  ringLayout: RingLayout = null;
  isEditMode = false;
  ringLayoutForm: FormGroup;
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
    this.ringLayoutForm = this._fb.group({
      venue: ['', [Validators.required]],
      layout: [''],
      layoutObj: [null],
      isActive: [true, [Validators.required]],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    // get the ring layout id from router url
    this.currentRoute.params.subscribe((params) => {
      if (params.rid !== undefined) {
        this.ringLayoutId = params.rid;
        this.store.dispatch(new RingLayoutsActions.GetRingLayoutByIdStart(this.ringLayoutId));
        this.isEditMode = true;
      }
    });

    // subscribe to ringlayout state and wait for data to populate in the form
    this.store
      .select('ringLayouts', 'ringLayoutCurrent')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading || !!state.update.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.ringLayout = state.item;
          this.titleService.setTitle('Ring Layout - ' + state.item.venue);
          this.populateForm(state.item);
          if (state.update.item === null) {
          } else {
            this.store.dispatch(new RingLayoutsActions.ResetRingLayoutCurrentState());
          }
          this.router.navigateByUrl('/admin/ring-layouts');
        }
      });

    // subscribe to upload layout file state to be ready for saving / updating layout info
    this.store
      .select('ringLayouts', 'uploadRingLayoutFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          this.ringLayoutForm.patchValue({
            layout: state.item.path,
            layoutObj: null
          });

          // save the rest of the form
          this.onSubmit();
        }
      });

  }

  populateForm(ringLayout: RingLayout) {
    this.ringLayoutForm.patchValue({
      venue: ringLayout.venue,
      layout: ringLayout.layout,
      isActive: ringLayout.isActive,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.ringLayoutForm.invalid) {
      return;
    } else {
      const postObj = this.ringLayoutForm.value;

      if (postObj.layoutObj !== null) {
        // upload the file
        this.store.dispatch(new RingLayoutsActions.UploadRingLayoutFileStart(postObj.layoutObj));
        // after uploaded the file, listen to it from store state and trigger the onsubmit again with image file data updated in the form data.
      } else {
        // updating ring layout
        if (this.ringLayout !== null) {
          if (!_.isEmpty(postObj)) {
            this.store.dispatch(new RingLayoutsActions.PutRingLayoutByIdStart(postObj, this.ringLayout._id));
          }
        } else {
          // creating ring layout
          this.store.dispatch(new RingLayoutsActions.PostRingLayoutStart(postObj));
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
    this.ringLayoutForm.patchValue({ 
      layout: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file)),
      layoutObj: file
    });

    this.ringLayoutForm.get('layoutObj').markAsDirty();
  }

  resetForm() {
    this.submitted = false;
    if (this.ringLayoutId !== null && this.ringLayout !== null) {
      this.ringLayoutForm.patchValue({
        venue: this.ringLayout.venue,
        layout: this.ringLayout.layout,
        layoutObj: null,
        isActive: this.ringLayout.isActive,
        blockIt: '',
      });
    } else {
      this.ringLayoutForm.patchValue({
        venue: '',
        layout: '',
        layoutObj: null,
        isActive: '',
        blockIt: '',
      });
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}

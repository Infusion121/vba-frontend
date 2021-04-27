import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducer';
import * as MemberInfosActions from '../../../store/actions/memberInfos.actions';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit, OnDestroy {
  rootUrl = 'http://localhost:3600/';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';
  componentDestroyed$: Subject<boolean> = new Subject();

  memberId: any = null;
  member: MemberInfo = null;
  isEditMode = false;
  memberForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.memberForm = this._fb.group({
      description: ['', [Validators.required]],
      file: [''],
      fileObj: [null],
      isActive: [true, [Validators.required]],
      blockIt: ['', [this.validatorHoneyPot]],
    });

    // get the member id from router url
    this.currentRoute.params.subscribe((params) => {
      if (params.mid !== undefined) {
        this.memberId = params.mid;
        this.store.dispatch(new MemberInfosActions.GetMemberInfoByIdStart(this.memberId));
        this.isEditMode = true;
      }
    });

    // subscribe to member state and wait for data to populate in the bookmaker form
    this.store
      .select('members', 'memberInfoCurrent')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading || !!state.update.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null && state.update.loading === false) {
          this.member = state.item;
          this.titleService.setTitle('Member - ' + state.item.description);
          this.populateForm(state.item);
          if (state.update.item === null) {
          } else {
            this.store.dispatch(new MemberInfosActions.ResetMemberInfoCurrentState());
            this.router.navigateByUrl('/admin/members-info');
          }
        }
      });

    // subscribe to upload member file state to be ready for saving / updating member info
    this.store
      .select('members', 'uploadMemberInfoFile')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        if (!!state.loading) {
          this.loading = true;
        } else {
          this.loading = false;
        }

        if (state.item !== null && state.loading === false && state.error === null) {
          const imageUrl = state.item.path;
          this.memberForm.patchValue({
            file: state.item.path,
            fileObj: null
          });

          // save the rest of the form
          this.onSubmit();
        }
      });

    
  }

  populateForm(member: MemberInfo) {
    this.memberForm.patchValue({
      description: member.description,
      file: member.file,
      isActive: member.isActive,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    } else {
      const postObj = this.memberForm.value;

      if (postObj.fileObj !== null) {
        // upload the file
        this.store.dispatch(new MemberInfosActions.UploadMemberInfoFileStart(postObj.fileObj));
        // after uploaded the file, listen to it from store state and trigger the onsubmit again with image file data updated in the form data.
      } else {
        // updating member
        if (this.member !== null) {
          if (!_.isEmpty(postObj)) {
            this.store.dispatch(new MemberInfosActions.PutMemberInfoByIdStart(postObj, this.member._id));
          }
        } else {
          // creating member
          this.store.dispatch(new MemberInfosActions.PostMemberInfoStart(postObj));
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
    this.memberForm.patchValue({ fileObj: file });
  }

  resetForm() {
    this.submitted = false;
    if (this.memberId !== null && this.member !== null) {
      this.memberForm.patchValue({
        description: this.member.description,
        file: this.member.file,
        fileObj: null,
        isActive: this.member.isActive,
        blockIt: '',
      });
    } else {
      this.memberForm.patchValue({
        description: '',
        file: '',
        fileObj: null,
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

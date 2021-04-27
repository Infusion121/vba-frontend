import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as MemberInfosActions from '../../store/actions/memberInfos.actions';

@Component({
  selector: 'app-members-info',
  templateUrl: './members-info.component.html',
  styleUrls: ['./members-info.component.scss'],
})
export class MembersInfoComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  memberInfosObject: { [key: string]: MemberInfo } = null;
  memberInfosCount: number = null;
  loading = true;
  rootUrl = 'http://localhost:3600/';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    // dispatch action to get all members
    this.store.dispatch(new MemberInfosActions.GetMemberInfosStart());

    // subscribe to member-info state and wait for data to populate in table
    this.store
      .select('members', 'memberInfosList')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.error !== null) {
          console.log(state.error);
        } else if (state.itemsObject !== null && state.loading === false && state.error === null) {
          this.memberInfosObject = state.itemsObject;
          this.memberInfosCount = state.itemsCount;
        }
      });
  }

  editItemPage(memberId: any) {
    this.router.navigateByUrl('/admin/members-info/' + memberId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

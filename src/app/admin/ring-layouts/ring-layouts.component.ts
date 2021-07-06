import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RingLayoutsActions from '../../store/actions/ringLayouts.actions';
import { RingLayout } from '@app/model/ringLayout.model';

@Component({
  selector: 'app-ring-layouts',
  templateUrl: './ring-layouts.component.html',
  styleUrls: ['./ring-layouts.component.scss'],
})
export class RingLayoutsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  ringLayoutsObject: { [key: string]: RingLayout } = null;
  ringLayoutsCount: number = null;
  loading = true;
  // rootUrl = 'http://localhost:3600/';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/';
  rootUrl = 'http://api-production.vicbookmakers.com.au/';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    // dispatch action to get all ring layouts
    this.store.dispatch(new RingLayoutsActions.GetRingLayoutsStart());

    // subscribe to ring-layouts state and wait for data to populate in table
    this.store
      .select('ringLayouts', 'ringLayoutsList')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.error !== null) {
          console.log(state.error);
        } else if (state.itemsObject !== null && state.loading === false && state.error === null) {
          this.ringLayoutsObject = state.itemsObject;
          this.ringLayoutsCount = state.itemsCount;
        }
      });
  }

  editItemPage(infoSheetId: any) {
    this.router.navigateByUrl('/admin/ring-layouts/' + infoSheetId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

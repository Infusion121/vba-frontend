import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as InfoSheetsActions from '../../store/actions/infoSheets.actions';

@Component({
  selector: 'app-info-sheets',
  templateUrl: './info-sheets.component.html',
  styleUrls: ['./info-sheets.component.scss'],
})
export class InfoSheetsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  infoSheetsObject: { [key: string]: MemberInfo } = null;
  infoSheetsCount: number = null;
  loading = true;
  // rootUrl = 'http://localhost:3600/';
  //rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/';
  rootUrl = 'http://api-production.vicbookmakers.com.au/';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    // dispatch action to get all info sheets
    this.store.dispatch(new InfoSheetsActions.GetInfoSheetsStart());

    // subscribe to info-sheets state and wait for data to populate in table
    this.store
      .select('infoSheets', 'infoSheetsList')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.error !== null) {
          console.log(state.error);
        } else if (state.itemsObject !== null && state.loading === false && state.error === null) {
          this.infoSheetsObject = state.itemsObject;
          this.infoSheetsCount = state.itemsCount;
        }
      });
  }

  editItemPage(memberId: any) {
    this.router.navigateByUrl('/admin/info-sheets/' + memberId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

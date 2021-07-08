import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as NewlettersActions from '../../store/actions/newsletters.actions';
import { Newsletter } from '@app/model/newsletter.model';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.scss'],
})
export class NewslettersComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  newslettersObject: { [key: string]: Newsletter } = null;
  newslettersCount: number = null;
  loading = true;
  // rootUrl = 'http://localhost:3600/';
  rootUrl = 'https://api-registration.vicbookmakers.infusion121.com/';
  // rootUrl = 'https://api-production.vicbookmakers.com.au/';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    // dispatch action to get all newsletters
    this.store.dispatch(new NewlettersActions.GetNewslettersStart());

    // subscribe to newsletters state and wait for data to populate in table
    this.store
      .select('newsletters', 'newslettersList')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.error !== null) {
          console.log(state.error);
        } else if (state.itemsObject !== null && state.loading === false && state.error === null) {
          this.newslettersObject = state.itemsObject;
          this.newslettersCount = state.itemsCount;
        }
      });
  }

  convertDateToDateString(date: any) {
    const miliSeconds = date * 1000;
    const dateObject = new Date(miliSeconds);
    return dateObject.toLocaleDateString();
  }

  editItemPage(memberId: any) {
    this.router.navigateByUrl('/admin/newsletters/' + memberId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

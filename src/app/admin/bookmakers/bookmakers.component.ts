import { Component, OnInit } from '@angular/core';
import { Bookmaker } from '@app/model/bookmaker.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as BookmakersActions from '../../store/actions/bookmakers.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmakers',
  templateUrl: './bookmakers.component.html',
  styleUrls: ['./bookmakers.component.scss'],
})
export class BookmakersComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  bookmakersObject: { [key: string]: Bookmaker } = null;
  bookmakersCount: number = null;
  loading = true;
  rootUrl = 'http://localhost:3000/';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    // dispatch action to get all jobs
    this.store.dispatch(new BookmakersActions.GetBookmakersStart());

    // subscribe to job state and wait for data to populate in job table
    this.store
      .select('bookmakers', 'bookmakersList')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.error !== null) {
          // don't have messsageservice set up for this project.
          // if you want, have a look at exe valet
          // this.messageService.showError(state.error);
          console.log(state.error);
        } else if (state.itemsObject !== null && state.loading === false && state.error === null) {
          this.bookmakersObject = state.itemsObject;
          this.bookmakersCount = state.itemsCount;
          //this.messageService.showSuccess('', 'Jobs has been loaded');
        }
      });
  }

  editItemPage(bookermakerId: any) {
    this.router.navigateByUrl('/admin/bookmakers/' + bookermakerId);
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }
}

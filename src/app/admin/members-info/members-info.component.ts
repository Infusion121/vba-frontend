import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberInfo } from '@app/model/memberInfo.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-members-info',
  templateUrl: './members-info.component.html',
  styleUrls: ['./members-info.component.scss'],
})
export class MembersInfoComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  memberInfosObject: { [key: string]: MemberInfo} = null;
  memberInfosCount: number = null;
  loading = true;
  rootUrl = 'http://localhost:3600/';
  // rootUrl = 'https://api-registration.vicbookmakers.infusion121.com';

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {}
}

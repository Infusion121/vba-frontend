import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  logOutUser() {
    this.authenticationService.logOutUser();
  }
}

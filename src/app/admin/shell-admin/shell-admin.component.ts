import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-shell-admin',
  templateUrl: './shell-admin.component.html',
  styleUrls: ['./shell-admin.component.scss', './../admin-styles.css'],
})
export class ShellAdminComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  logOutUser() {
    this.authenticationService.logOutUser();
  }
}

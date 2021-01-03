import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';

  resetPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    const splittedpath = window.location.pathname.split('/');
    this.token = splittedpath[3];
  }

  changePassword(): void {
    this.userService
      .changePassword(this.resetPassword.value.password, this.token)
      .subscribe(
        (result: any) => {
          this.snackBar.open('Password succesfully changed', 'OK', {
            duration: 2000,
          });
          this.router.navigateByUrl('/login');
        },
        (err: any) => {
          this.snackBar.open(err.error.message, 'OK', {
            duration: 2000,
          });
        }
      );
  }
}

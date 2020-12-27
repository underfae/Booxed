import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    protected userService: UserService,
    protected snackBar: MatSnackBar,
    protected router: Router
  ) {}

  token: string = '';

  ngOnInit() {
    let splittedpath = window.location.pathname.split('/');
    this.token = splittedpath[3];
  }

  resetPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  changePassword() {
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

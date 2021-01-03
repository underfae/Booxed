import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    protected userService: UserService,
    protected snackBar: MatSnackBar
  ) {}

  sendLink(): void {
    this.userService.forgotPassword(this.forgotPassword.value.email).subscribe(
      (result: any) => {
        this.snackBar.open('Email successfully send. Check your email', 'OK', {
          duration: 2000,
        });
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

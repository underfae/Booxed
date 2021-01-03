import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  loggedUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.isUserLogged()) this.router.navigate(['/booxed']);
  }

  login(): void {
    this.userService.loginUser(this.loggedUser.value).subscribe(
      (result) => {
        this.userService.setUserToken(result['token']);
        this.router.navigateByUrl('booxed');
      },
      (error) => {
        this.snackBar.open(error.error.message, 'OK', { duration: 4000 });
        this.loggedUser.reset();
      }
    );
  }
}

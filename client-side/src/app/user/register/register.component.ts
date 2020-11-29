import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

import {User} from '../../core/user/user.model';
import {UserService} from '../../core/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent {

  user = new User;
  serverErrors: string;

  constructor(protected router: Router,
              protected snackBar: MatSnackBar,
              protected userService: UserService,) {
  }

  userRegistered = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@~`#$%^_&*()<>,.\\\/;:]).{8,}$')]),
  })

  register() {
    Object.assign(this.user, this.userRegistered.value)
    this.user.liked = [];
    this.user.read = [];
    this.user.points = 0;

    this.userService.registerUser(this.user).subscribe(
      () => {
        this.router.navigateByUrl("/login");
        this.snackBar.open('Succesfully registered.', 'OK', {duration: 2000})
      },
      error => {
        error.status === 422 ? this.serverErrors = error.error : this.serverErrors = 'Something went wrong. Try again.';
        this.snackBar.open(this.serverErrors, 'OK', {duration: 4000});
      }
    )
  }

}

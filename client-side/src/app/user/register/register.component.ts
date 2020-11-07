import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../shared/user/user.model';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent {

  user = new User;
  serverErrors: string;

  userRegistered = new FormGroup({
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@~`#$%^&*()<>,.\\\/;:]).{8,}$')]),
  })

  constructor(protected userService: UserService) { }

  register(){
    Object.assign(this.user, this.userRegistered.value)
    this.user.liked = 0;
    this.user.read = 0;
    this.user.points = 0;

    this.userService.registerUser(this.user).subscribe(
      () => {
        console.log('succesfully registered')
      },
      error => {
        error.status === 422 ? this.serverErrors = error.error : this.serverErrors = 'Something went wrong. Try again.';
      }
    )
  }

}

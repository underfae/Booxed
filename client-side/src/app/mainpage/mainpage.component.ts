import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {User} from '../core/user/user.model';
import {UserService} from "../core/user/user.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  constructor(protected userService: UserService, private router: Router) {
  }

  User = new User;

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      result => {
        this.User = result['user']
      },
      error => {
        console.log('Could not fetch the user')
      }
    )
  }

  logout() {
    this.userService.deleteUserToken();
    this.router.navigate(['/login'])
  }

}

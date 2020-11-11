import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../../core/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(protected userService: UserService,
              protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isUserLogged()) {
      return true
    } else {
      this.router.navigateByUrl('/login');
      this.userService.deleteUserToken();
      return false;
    }
  }
}

import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

import {Observable} from "rxjs";
import {tap} from 'rxjs/operators'

import {UserService} from "../../core/user/user.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(protected userService: UserService, protected router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('noauth')) {
      return next.handle(req.clone())
    } else {
      const cloned = req.clone({headers: req.headers.set('Authorization', "Bearer " + this.userService.getUserToken())});
      return next.handle(cloned).pipe(
        tap(
          event => {
          },
          error => {
            if (error.error.auth == false) {
              this.router.navigateByUrl('/login')
            }
          }
        )
      )
    }
  }
}

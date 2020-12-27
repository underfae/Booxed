import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModifiedUser, User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    protected http: HttpClient,
    protected userService: UserService,
    protected snackBar: MatSnackBar
  ) {}

  getWordOfTheDay() {
    return this.http.get(environment.apiBaseUrl + '/randomWord');
  }

  getMovies(title: string) {
    return this.http.get(
      environment.apiBaseUrl + '/movies/' + encodeURIComponent(title)
    );
  }

  addPoints(value: number, user: any) {
    const modifiedUser = new ModifiedUser();
    modifiedUser.liked = user.liked;
    modifiedUser.read = user.read;
    modifiedUser.points = user.points + value;
    modifiedUser.id = user._id;
    this.userService.modifyUser(modifiedUser).subscribe(
      () => {
        this.snackBar.open('You have gained ' + value + ' extra points', 'OK', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Could not add points to your account.', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  deletePoints(value: number, user: User) {
    const modifiedUser = new ModifiedUser();
    modifiedUser.liked = user.liked;
    modifiedUser.read = user.read;
    modifiedUser.points = user.points - value;
    modifiedUser.id = user._id;
    this.userService.modifyUser(modifiedUser).subscribe(
      () => {
        this.snackBar.open(
          value + ' points have been deleted from  counter',
          'OK',
          { duration: 2000 }
        );
      },
      () => {
        this.snackBar.open('Could not delete points from  account.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

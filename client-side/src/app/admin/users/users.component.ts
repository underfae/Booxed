import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../core/user/user.model';
import { UserService } from '../../core/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageDialogComponent } from '../../shared/components/send-message-dialog/send-message-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user = new User();
  serverErrors: string;

  constructor(
    protected userService: UserService,
    protected snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((result: User[]) => {
      this.users = result;
    });
  }

  newUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@~`#$%^_&*()<>,.\\/;:]).{8,}$'
      ),
    ]),
  });

  addUser() {
    Object.assign(this.user, this.newUser.value);
    this.user.liked = [];
    this.user.read = [];
    this.user.points = 100;
    this.user.role = 'user';

    this.userService.registerUser(this.user).subscribe(
      () => {
        this.users.push(this.user);
        this.cdr.detectChanges();
        this.snackBar.open('User succesfully registered.', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        error.status === 422
          ? (this.serverErrors = error.error)
          : (this.serverErrors = 'Something went wrong. Try again.');
        this.snackBar.open(this.serverErrors, 'OK', { duration: 4000 });
      }
    );
  }

  deleteUser(user_id: string) {
    if (user_id) {
      this.userService.deleteUser(user_id).subscribe(
        () => {
          this.snackBar.open('User succesfully deleted', 'OK', {
            duration: 2000,
          });
          this.users.splice(
            this.users.findIndex(function (i) {
              return i._id === user_id;
            }),
            1
          );
        },
        () => {
          this.snackBar.open('Could not delete user', 'OK', { duration: 2000 });
        }
      );
    }
  }

  openMessageDialog(email: string) {
    const dialogRef = this.dialog.open(SendMessageDialogComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendMessage(result.subject, result.text, email);
      }
    });
  }

  sendMessage(subject: string, text: string, email: string) {
    this.userService.sendMessage(email, subject, text).subscribe(
      () => {
        this.snackBar.open('Message has been successfully send', 'OK', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Message could not be send', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

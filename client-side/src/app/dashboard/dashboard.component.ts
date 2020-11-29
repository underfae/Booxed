import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import {BookshelvesComponent} from "../bookshelves/bookshelves.component";
import {BookshelfService} from "../core/bookshelves/bookshelf.service";
import {UserService} from "../core/user/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BookshelvesComponent {


  constructor(
    protected bookshelfService: BookshelfService,
    protected cdr: ChangeDetectorRef,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected userService: UserService,
  ) {
    super(dialog, userService, bookshelfService, snackBar, cdr)
  }

}

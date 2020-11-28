import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../core/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {BookshelvesComponent} from "../bookshelves/bookshelves.component";
import {BookshelfService} from "../core/bookshelves/bookshelf.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BookshelvesComponent {


  constructor(protected userService: UserService, protected dialog: MatDialog, protected bookshelfService: BookshelfService, protected snackBar: MatSnackBar, protected cdr: ChangeDetectorRef) {
    super(dialog, userService, bookshelfService, snackBar, cdr)
  }

}

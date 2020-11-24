import { Component, OnInit } from '@angular/core';
import {UserService} from "../core/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import { BookshelvesComponent} from "../bookshelves/bookshelves.component";
import {BookshelfService} from "../core/bookshelves/bookshelf.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BookshelvesComponent {


  constructor(protected userService: UserService, protected dialog: MatDialog, protected bookshelfService: BookshelfService) {
    super(dialog, userService, bookshelfService)
  }

}

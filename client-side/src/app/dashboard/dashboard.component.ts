import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BooksService } from '../core/books/books.service';
import { BookshelvesComponent } from '../bookshelves/bookshelves.component';
import { BookshelfService } from '../core/bookshelves/bookshelf.service';
import { UserService } from '../core/user/user.service';
import { SharedService } from '../core/shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BookshelvesComponent {
  dailyBooks: any[] = [];
  wordOfTheDay: string;

  constructor(
    protected bookshelfService: BookshelfService,
    protected cdr: ChangeDetectorRef,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected userService: UserService,
    protected sharedService: SharedService,
    protected booksService: BooksService
  ) {
    super(bookshelfService, cdr, dialog, snackBar, userService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sharedService.getWordOfTheDay().subscribe((result: string) => {
      this.wordOfTheDay = result;
      if (this.wordOfTheDay) {
        this.booksService.getBooks(this.wordOfTheDay).subscribe(
          (result: any) => {
            this.dailyBooks = result.items;
          },
          () => {
            console.log('Could not fetch the books');
          }
        );
      }
    });
  }
}

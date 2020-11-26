import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../core/books/books.service";
import {UserService} from "../core/user/user.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: any;
  id: string;
  userId: string;

  constructor(private route: ActivatedRoute, protected booksService: BooksService, protected userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.booksService.getBookById(this.id).subscribe((result: any) => {
        this.book = result
      })
    }
    this.userService.getUserData().subscribe((result: any)=>{
      this.userId = result.user._id
    })
  }

  getRatingValue(value) {
    return (value / 5.0) * 100;
  }

  addToLiked(id: string) {

  }
}

import {Component, Input} from '@angular/core';
import {User} from "../../../core/user/user.model";

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent  {
  @Input() width: string;
  @Input() height: string;
  @Input() user: User;
  @Input() title: string;
  @Input() author: string;
  @Input() image: string;





  constructor() { }


}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-no-items-found',
  templateUrl: './no-items-found.component.html',
  styleUrls: ['./no-items-found.component.scss']
})
export class NoItemsFoundComponent {
@Input() text: string;
}

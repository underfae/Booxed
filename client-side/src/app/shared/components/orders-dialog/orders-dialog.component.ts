import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.scss']
})
export class OrdersDialogComponent implements OnInit {

  orders=[1,2,3,4,5,6,3,5,67,23];
  constructor() { }

  ngOnInit(): void {
  }

}

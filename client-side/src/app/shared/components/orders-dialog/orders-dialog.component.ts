import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Library } from '../../../core/points/library/library.model';
import { Order } from '../../../core/points/order/order.model';
import { Reward } from '../../../core/points/reward/reward.model';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.scss'],
})
export class OrdersDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: orderDialogData) {}

  getLibraryAddress(id: string): string {
    let filteredItem = this.data.libraries.filter((x) => x._id === id);
    return (
      filteredItem[0].street +
      ' ' +
      filteredItem[0].building_number +
      '/' +
      filteredItem[0].apartment_number
    );
  }

  getLibraryName(id: string): string {
    return this.data.libraries.filter((x) => x._id === id)[0].name;
  }

  getRewardName(id: string): string {
    return this.data?.rewards.filter((x) => x._id === id)[0]?.name;
  }
}

export interface orderDialogData {
  userId: string;
  libraries: Library[];
  rewards: Reward[];
  orders: Order[];
}

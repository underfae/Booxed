import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {Library} from "../../../core/points/library/library.model";
import {Order} from "../../../core/points/order/order.model";
import {Reward} from "../../../core/points/reward/reward.model";

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {

  newOrder = new Order;

  constructor(protected dialogRef: MatDialogRef<CreateOrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CreateOrderDialogData) {
  }

  ngOnInit(): void {
    this.newOrder.id_reward = this.data.reward._id;
  }

  getLibraryAddress(id: string): string {
    let filteredItem = this.data.libraries.filter(x => x._id === id)
    return filteredItem[0].street + ' ' + filteredItem[0].building_number + '/' + filteredItem[0].apartment_number + ' ' + filteredItem[0].city;
  }

  getLibraryName(id: string): string {
    return this.data.libraries.filter(x => x._id === id)[0].name
  }

  getLibraryTelephone(id: string): string {
    return this.data.libraries.filter(x => x._id === id)[0].telephone
  }

  close(): void {
    this.dialogRef.close();
  }

}

export interface CreateOrderDialogData {
  userId: string;
  libraries: Library[];
  reward: Reward;
}

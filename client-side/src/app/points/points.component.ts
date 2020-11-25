import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import {CreateOrderDialogComponent} from "../shared/components/create-order-dialog/create-order-dialog.component";
import {Library} from "../core/points/library/library.model";
import {LibraryService} from "../core/points/library/library.service";
import {Order} from "../core/points/order/order.model";
import {OrderService} from "../core/points/order/order.service";
import {OrdersDialogComponent} from "../shared/components/orders-dialog/orders-dialog.component";
import {PointsService} from "../core/points/reward/reward.service";
import {Reward} from "../core/points/reward/reward.model";
import {User} from "../core/user/user.model";
import {UserService} from "../core/user/user.service";

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  user: User
  rewards: Reward[] = []
  libraries: Library[] = []
  orders: Order[] = []
  orderToAdd = new Order;

  constructor(protected dialog: MatDialog,
              protected libraryService: LibraryService,
              protected orderService: OrderService,
              protected pointsService: PointsService,
              protected snackBar: MatSnackBar,
              protected userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.initArrays();
  }

  addOrder(): void {
    this.orderToAdd.id_user = this.user._id
    this.orderToAdd.status = 'Waiting for pickup'
    this.orderService.addOrder(this.orderToAdd).subscribe(
      () => {
        this.snackBar.open('Order succesfully added.', 'OK', {duration: 2000})
      })
  }

  initArrays(): void {
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user
      this.orderService.getOrdersById(this.user._id).subscribe((result: any) => {
        this.orders = result
      })
    })

    this.pointsService.getRewards().subscribe((result: any) => {
      this.rewards = result
    })

    this.libraryService.getLibraries().subscribe((result: any) => {
      this.libraries = result
    })
  }

  openCreateOrderDialog(item: Reward): void {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent, {
      width: '50%',
      height: 'auto',
      data: {userId: this.user._id, libraries: this.libraries, reward: item}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderToAdd = result;
        this.addOrder();
      }
    });
  }

  openOrdersDialog(): void {
    const dialogRef = this.dialog.open(OrdersDialogComponent, {
      width: '60%',
      height: 'auto',
      data: {userId: this.user._id, libraries: this.libraries, rewards: this.rewards, orders: this.orders}
    });
  }

}

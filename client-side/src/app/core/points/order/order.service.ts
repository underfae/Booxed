import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Order } from './order.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(protected http: HttpClient) {}

  getOrdersById(userId: string) {
    return this.http.get(environment.apiBaseUrl + '/orders/' + userId);
  }

  addOrder(order: Order) {
    return this.http.post(environment.apiBaseUrl + '/order/create', order);
  }
}

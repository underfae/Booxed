import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Order} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(protected http: HttpClient) { }

  getOrdersById(userId: string){
    return this.http.get(environment.apiBaseUrl + "/orders/" + userId)
  }

  addOrder(order: Order){
    return this.http.post(environment.apiBaseUrl + "/order/create", order)
  }

}

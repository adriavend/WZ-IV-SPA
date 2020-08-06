import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderRequest } from '../models/order/orderRequest';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../models/order/OrderResponse';
import * as glob from '../globals';

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class ApiOrderService {

    url: string = glob.apiEndPoint + '/order'

    constructor(private _http: HttpClient) 
    { }

    add(order: OrderRequest): Observable<any>{
        return this._http.post<OrderRequest>(this.url, order, httpOption);
    }

    getOrders(): Observable<OrderResponse[]> {
      return this._http.get<OrderResponse[]>(this.url);
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderResponse } from 'src/app/models/order/OrderResponse';
import { ApiOrderService } from 'src/app/services/api.order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public list: any[];
  public columns: string[] = ['id', 'client', 'date', 'total', 'actions']

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  dataSource: MatTableDataSource<OrderResponse>;

  constructor(
    private apiOrderService: ApiOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.apiOrderService.getOrders().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  newOrder() {
    this.router.navigate(['/new-order']);
  }
}

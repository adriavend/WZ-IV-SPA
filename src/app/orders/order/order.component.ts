import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiProductService } from 'src/app/services/api.products.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetail } from 'src/app/models/order/orderDetail';
import { OrderRequest } from 'src/app/models/order/orderRequest';
import { ApiOrderService } from 'src/app/services/api.order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public listProducts: Product[];
  public client: string;
  public total: number = 0;

  public listItemsOrder: OrderDetail[] = new Array();
  public columns: string[] = ['id', 'description', 'quantity', 'price', 'subtotal', 'actions']

  dataSource: MatTableDataSource<OrderDetail>;

  constructor(
    private apiProductService: ApiProductService,
    private apiOrderService: ApiOrderService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }
  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listItemsOrder);
    this.getProducts();
  }

  getProducts() {
    this.apiProductService.getProducts().subscribe(response => {
      this.listProducts = response;
    })
  }

  addItem(product: Product){
  
    let itemFound: OrderDetail;

    itemFound = this.listItemsOrder.filter(f => f.idProduct == product.id)[0];

    if (itemFound == undefined){
      let orderDetail: OrderDetail = {
        idProduct: product.id,
        product: product.description,
        quantity: 1,
        price: product.price,
        subTotal: product.price
      }
      this.listItemsOrder.push(orderDetail);
    } else {
      itemFound.quantity++;
      itemFound.subTotal = itemFound.quantity * itemFound.price;
    }
    
    this.total += product.price;
    this.refreshDataSource(); 
  }

  deleteItem(item: OrderDetail) {
    this.listItemsOrder = this.listItemsOrder.filter(f => f.idProduct != item.idProduct);
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataSource.data = this.listItemsOrder;
    // this.dataSource = new MatTableDataSource(this.listProductsOrder);
  }

  saveOrder() {
    let orderReq: OrderRequest = {
      client: this.client,
      details: this.listItemsOrder
    }   
    
    this.apiOrderService.add(orderReq).subscribe(response => {
      console.log(response);
      this.snackBar.open('Successfully save Order', '', {
        duration: 2000
      });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2100);
    });

  }
}

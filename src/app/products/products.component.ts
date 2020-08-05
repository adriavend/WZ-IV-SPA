import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProductService } from '../services/api.products.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { ProductRequestDto } from '../models/product/productRequestDto';
import { Product } from '../models/product';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public list: any[];
  public columns: string[] = ['id', 'description', 'category', 'subcategory', 'price', 'status', 'actions']
  readonly widthDialog: string = '500';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Product>;

  constructor(
    private apiProductService: ApiProductService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiProductService.getProducts().subscribe(response => {
      //this.list = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    })
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: this.widthDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    })
  }

  openEdit(product: Product){
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: this.widthDialog,
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    })
  }

  delete(product: Product) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.widthDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      // este result viene del modal depende del boton que apreto.
      if (result) {
        this.apiProductService.delete(product.id).subscribe(response => {
          console.log(response);
          if (response.ok == 1) { 
            this.snackBar.open('Successfully deleted Product', '', {
              duration: 2500
            })
            this.getProducts();
          }
        })
      }
    });
  }

  changeStatus(event: MatCheckboxChange, product: Product) {
    // console.log(event.checked);
    // console.log(product);
    product.active = event.checked;

    this.apiProductService.edit(product).subscribe(response => {
      this.snackBar.open('Successfully updated Product', '', {
        duration: 3000
      });
    })
  }

}

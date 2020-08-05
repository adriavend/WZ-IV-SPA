import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogClienteComponent } from 'src/app/cliente/dialog/dialogcliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiProductService } from 'src/app/services/api.products.service';

import { ProductRequestDto } from 'src/app/models/product/productRequestDto';
import { ApiSubcategoryService } from 'src/app/services/api.subcategory.service';
import { SubCategory } from 'src/app/models/subcategory';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  listSubCategories: SubCategory[];

  description: string;
  idsubcategory: number;
  price: number;
  active: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    public apiProductService: ApiProductService,
    public snackBar: MatSnackBar,
    private apiSubCategoryService: ApiSubcategoryService,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { 
      if (this.product !== null) {
        this.description = product.description;
        this.idsubcategory = product.idsubcategory;
        this.price = product.price;
        this.active = product.active;
      }
  }

  ngOnInit(): void {
    this.apiSubCategoryService.getSubCategories().subscribe(response => {
      this.listSubCategories = response;
    })
  }

  close() {
    this.dialogRef.close();
  }

  addProduct() {
    const product: ProductRequestDto = {
      id: 0,
      description: this.description, 
      idsubcategory: this.idsubcategory, 
      price: parseFloat(this.price.toString()),
      active: this.active 
    };
    this.apiProductService.add(product).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open('Successfully saved Product', '', {
        duration: 3000
      });
    })
  }

  editProduct() {
    const product: ProductRequestDto = {
      id: this.product.id,
      description: this.description, 
      idsubcategory: this.idsubcategory, 
      price: parseFloat(this.price.toString()), 
      active: this.active 
    };
    this.apiProductService.edit(product).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open('Successfully updated Product', '', {
        duration: 3000
      });
    })
  }

}

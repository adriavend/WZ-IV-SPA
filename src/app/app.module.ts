import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select'

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';

import { HttpClientModule } from '@angular/common/http'

import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogClienteComponent } from './cliente/dialog/dialogcliente.component'

import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { DialogProductComponent } from './products/dialog-product/dialog-product.component';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';

import { OrderComponent } from './orders/order/order.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    DialogClienteComponent,
    ProductsComponent,
    DialogProductComponent,
    DialogDeleteComponent,
    OrderComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatBadgeModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

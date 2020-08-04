import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Response } from '../models/response';
import { Product } from '../models/product';
import { ProductRequestDto } from '../models/product/productRequestDto';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  url: string = 'http://localhost:9108/api/product';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.url);
  }

  add(product: ProductRequestDto): Observable<ProductRequestDto>{
    return this._http.post<Product>(this.url, product, httpOption);
  }

  edit(product: ProductRequestDto): Observable<ProductRequestDto>{
    return this._http.put<ProductRequestDto>(this.url, product, httpOption);
  }

  delete(id: number): Observable<any>{
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}

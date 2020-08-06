import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/subcategory';
import * as glob from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ApiSubcategoryService {

  url: string = glob.apiEndPoint + '/subcategory';

  constructor(private _http: HttpClient) { }

  getSubCategories(): Observable<SubCategory[]> {
    return this._http.get<SubCategory[]>(this.url);
  }
}

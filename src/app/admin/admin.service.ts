import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../_common/const';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getServices(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services`, {params: param});
  }

  getServiceDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services/${id}`)
  }

  getProducts(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products`, {params: param});
  }

  getProductsDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products/${id}`);
  }

  getTypeProduct(): Observable<any> {
    return this.http.get<any>(`${urlApi}/api/types`);
  }

  updateService(id, body): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/services/${id}`, body);
  }

  removeService(id): Observable<any>{
    return this.http.delete<any>(`${urlApi}/api/services/${id}`);
  }

  createService(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/services/create`, body);
  }

  removeProduct(id): Observable<any>{
    return this.http.delete<any>(`${urlApi}/api/products/${id}`);
  }

  updateProduct(id, body): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/products/${id}`, body);
  }

  createProduct(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/products/create`, body);
  }

  getOrders(param):Observable<any> {
    return this.http.get<any>(`${urlApi}/api/orders`, {params: param})
  }

  updateStatusOrder(id): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/orders/${id}`, {});
  }

  deleteOrder(id): Observable<any> {
    return this.http.delete(`${urlApi}/api/orders/${id}`)
  }
}

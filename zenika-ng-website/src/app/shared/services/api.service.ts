import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from '../../basket/basket.types';
import { Customer } from '../../customer/customer.types';
import { Product } from '../../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly basePath = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.basePath}/api/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.basePath}/api/products/${id}`);
  }

  getBasket(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`${this.basePath}/api/basket`);
  }

  addToBasket(productId: string): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(`${this.basePath}/api/basket`, { productId });
  }

  checkoutBasket(customer: Customer) {
    return this.httpClient.post<{ orderNumber: number }>(`${this.basePath}/api/basket/checkout`, customer);
  }

  __kaboom__() {
    return this.httpClient.get<{ reset: true }>(`${this.basePath}/reset`);
  }
}

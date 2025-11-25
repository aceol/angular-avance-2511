import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  items: BasketItem[] = [];

  get total(): number {
    return this.items.reduce((total, { price }) => total + price, 0);
  }

  get numberOfItems(): number {
    return this.items.length;
  }

  private apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.apiService.getBasket().pipe(tap((items) => (this.items = items)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService.addToBasket(productId).pipe(tap((item) => this.items.push(item)));
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService.checkoutBasket(customer).pipe(tap(() => (this.items = [])));
  }
}

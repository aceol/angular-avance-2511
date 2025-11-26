import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  #items$ = new BehaviorSubject<BasketItem[]>([]);
  items$ = this.#items$.asObservable();

  get total$(): Observable<number> {
    return this.#items$.pipe(
      map((items) => items.reduce((total, { price }) => total + price, 0)),
    );
  }

  get numberOfItems$(): Observable<number> {
    return this.#items$.pipe(map(({ length }) => length));
  }

  private apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.apiService.getBasket().pipe(
      tap((items) => this.#items$.next(items)),
      catchError((e) => {
        console.error(e);
        return EMPTY;
      }),
    );
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService
      .addToBasket(productId)
      .pipe(tap((item) => this.#items$.next([...this.#items$.value, item])));
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService
      .checkoutBasket(customer)
      .pipe(tap(() => this.#items$.next([])));
  }
}

import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BasketFormComponent } from './basket-form/basket-form.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [AsyncPipe, CurrencyPipe, BasketFormComponent],
})
export class BasketComponent implements OnDestroy {
  #basketService = inject(BasketService);
  #alertService = inject(AlertService);

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  protected get basketItems$(): Observable<BasketItem[]> {
    return this.#basketService.items$;
  }

  protected get basketTotal(): Observable<number> {
    return this.#basketService.total$;
  }

  private serviceSubscribe;

  constructor() {
    // TODO add a resolver to fetch data from route
    this.serviceSubscribe = this.#basketService
      .fetch()
      .pipe(
        catchError(() => {
          this.#alertService.addDanger(
            "😖 Désolé, impossible d'accéder au panier.",
          );
          return EMPTY;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}

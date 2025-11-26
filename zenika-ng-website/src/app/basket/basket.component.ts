import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [AsyncPipe, CurrencyPipe],
})
export class BasketComponent implements OnDestroy {
  #basketService = inject(BasketService);
  #alertService = inject(AlertService);
  #router = inject(Router);

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

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.#basketService.checkout(this.customer).subscribe({
      next: ({ orderNumber }) => {
        this.#alertService.addSuccess(
          `🚀 Merci pour votre commande (réf. ${orderNumber}).`,
        );
        this.#router.navigate(['']);
      },
      error: () => {
        this.#alertService.addDanger("😱 Désolé, une erreur s'est produite.");
      },
    });
  }
}

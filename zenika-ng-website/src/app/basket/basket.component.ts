import { Component, inject } from '@angular/core';
import { Customer } from '../customer/customer.types';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BasketFormComponent } from './basket-form/basket-form.component';
import { selectBasket } from '../shared/store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    imports: [AsyncPipe, CurrencyPipe, BasketFormComponent],
})
export class BasketComponent {
    #store = inject(Store);

    protected customer: Customer = { name: '', address: '', creditCard: '' };

    protected basket$ = this.#store.select(selectBasket.items);

    protected basketItems$ = this.#store.select(selectBasket.numberOfItems);

    protected basketTotal = this.#store.select(selectBasket.total);
}

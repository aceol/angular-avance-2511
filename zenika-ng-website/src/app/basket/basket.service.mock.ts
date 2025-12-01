import { delay, of } from 'rxjs';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

// NOTE: We use `delay(0)` in the mocked observables to force the use of `waitForAsync` in the tests

export const MockBasketService: Partial<BasketService> = {
    items$: of([] as BasketItem[]).pipe(delay(0)),

    total$: of(0).pipe(delay(0)),

    numberOfItems$: of(0).pipe(delay(0)),

    fetch: jest.fn(() => of([] as BasketItem[]).pipe(delay(0))),

    addItem: jest.fn(() =>
        of({ id: 'id', title: 'title', price: 10 } as BasketItem).pipe(delay(0))
    ),

    checkout: jest.fn(() => of({ orderNumber: 1 }).pipe(delay(0))),
};

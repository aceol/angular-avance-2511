import { delay, of } from 'rxjs';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

// NOTE: We use `delay(0)` in the mocked observables to force the use of `waitForAsync` in the tests

export const MockBasketService: Partial<BasketService> = {
  basket$: of([] as BasketItem[]).pipe(delay(0)),

  total$: of(0).pipe(delay(0)),

  numberOfItems$: of(0).pipe(delay(0)),

  fetch: jasmine.createSpy('fetch').and.returnValue(of([] as BasketItem[]).pipe(delay(0))),

  addItem: jasmine
    .createSpy('addItem')
    .and.returnValue(of({ id: 'id', title: 'title', price: 10 } as BasketItem).pipe(delay(0))),

  checkout: jasmine.createSpy('checkout').and.returnValue(of({ orderNumber: 1 }).pipe(delay(0))),
};

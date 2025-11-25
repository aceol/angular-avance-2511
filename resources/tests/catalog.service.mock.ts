import { delay, of } from 'rxjs';
import { CatalogService } from './catalog.service';
import { Product } from './product/product.types';

// NOTE: We use `delay(0)` in the mocked observables to force the use of `waitForAsync` in the tests

export const MockCatalogService: Partial<CatalogService> = {
  products$: of([
    { id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 },
  ] as Product[]).pipe(delay(0)),

  isStockEmpty$: of(false).pipe(delay(0)),

  fetch: jasmine
    .createSpy('fetch')
    .and.returnValue(
      of([
        { id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 },
      ] as Product[]).pipe(delay(0))
    ),

  decreaseStock: jasmine.createSpy('decreaseStock'),

  isAvailable: jasmine.createSpy('isAvailable').and.returnValue(true),
};

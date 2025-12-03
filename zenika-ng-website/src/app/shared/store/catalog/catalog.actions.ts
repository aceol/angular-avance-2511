import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../catalog/product/product.types';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    Fetch: emptyProps(),
    'Fetch Success': props<{ products: Product[] }>(),
    'Fetch Failure': emptyProps(),

    'Decrease Stock': props<{ productId: string }>(),
  },
});

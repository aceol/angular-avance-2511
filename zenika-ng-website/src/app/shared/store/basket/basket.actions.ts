import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BasketItem } from '../../../basket/basket.types';
import { Customer } from '../../../customer/customer.types';

export const basketActions = createActionGroup({
  source: 'Basket',
  events: {
    Fetch: emptyProps(),
    'Fetch Success': props<{ items: BasketItem[] }>(),
    'Fetch Failure': emptyProps(),

    'Add Item': props<{ productId: string }>(),
    'Add Item Success': props<{ basketItem: BasketItem; productId: string }>(),
    'Add Item Failure': emptyProps(),

    'Fill Customer': props<{ customer: Customer }>(),

    Checkout: emptyProps(),
    'Checkout Success': props<{ orderNumber: number }>(),
    'Checkout Failure': emptyProps(),
  },
});

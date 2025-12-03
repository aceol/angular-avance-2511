import { createFeature, createReducer, on } from '@ngrx/store';
import { BasketItem } from '../../../basket/basket.types';
import { Customer } from '../../../customer/customer.types';
import { basketActions } from './basket.actions';

export const basketFeatureKey = 'basket';

export interface State {
  items: BasketItem[];
  customer: Customer | undefined;
}

export const initialState: State = {
  items: [],
  customer: undefined,
};

export const reducer = createReducer(
  initialState,

  on(basketActions.fetchSuccess, (state, { items: basket }): State => ({ ...state, items: basket })),

  on(
    basketActions.addItemSuccess,
    (state, { basketItem }): State => ({ ...state, items: [...state.items, basketItem] }),
  ),

  on(basketActions.fillCustomer, (state, { customer }): State => ({ ...state, customer })),

  on(basketActions.checkoutSuccess, (state): State => ({ ...state, items: [] })),
);

export const basketFeature = createFeature({
  name: basketFeatureKey,
  reducer,
});

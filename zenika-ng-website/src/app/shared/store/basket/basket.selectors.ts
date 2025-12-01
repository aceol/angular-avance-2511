import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBasket from './basket.reducer';

const selectBasketState = createFeatureSelector<fromBasket.State>(fromBasket.basketFeatureKey);

export const selectBasket = {
  state: selectBasketState,

  items: createSelector(selectBasketState, ({ items }) => items),

  total: createSelector(selectBasketState, ({ items }) => items.reduce((total, { price }) => total + price, 0)),

  numberOfItems: createSelector(selectBasketState, ({ items: { length } }) => length),

  customer: createSelector(selectBasketState, ({ customer }) => customer),
};

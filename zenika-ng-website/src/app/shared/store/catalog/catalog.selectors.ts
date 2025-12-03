import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCatalog from './catalog.reducer';

const selectCatalogState = createFeatureSelector<fromCatalog.State>(fromCatalog.catalogFeatureKey);

export const selectCatalog = {
  state: selectCatalogState,

  products: createSelector(selectCatalogState, ({ products }) => products),

  isStockEmpty: createSelector(selectCatalogState, ({ products }) => products.every(({ stock }) => stock === 0)),
};

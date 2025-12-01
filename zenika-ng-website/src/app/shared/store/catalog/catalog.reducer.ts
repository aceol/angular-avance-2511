import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../catalog/product/product.types';
import { catalogActions } from './catalog.actions';

export const catalogFeatureKey = 'catalog';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products: [],
};

export const reducer = createReducer(
  initialState,

  on(catalogActions.fetchSuccess, (state, { products }): State => ({ ...state, products })),

  on(
    catalogActions.decreaseStock,
    (state, { productId }): State => ({
      ...state,
      products: state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    }),
  ),
);

export const catalogFeature = createFeature({
  name: catalogFeatureKey,
  reducer,
});

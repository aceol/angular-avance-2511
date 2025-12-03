import { FunctionalEffect } from '@ngrx/effects';
import { ActionReducerMap } from '@ngrx/store';
import { basketEffects } from './basket/basket.effects';
import * as fromBasket from './basket/basket.reducer';
import { catalogEffects } from './catalog/catalog.effects';
import * as fromCatalog from './catalog/catalog.reducer';

// ----- App State -----

export interface AppState {
  [fromBasket.basketFeatureKey]: fromBasket.State;
  [fromCatalog.catalogFeatureKey]: fromCatalog.State;
}

// ----- App Store -----

export const appReducers: ActionReducerMap<AppState> = {
  [fromBasket.basketFeatureKey]: fromBasket.reducer,
  [fromCatalog.catalogFeatureKey]: fromCatalog.reducer,
};

// ----- App Effects -----

export const appEffects: Record<string, FunctionalEffect>[] = [catalogEffects, basketEffects];

// ----- Forward all Actions and Selectors -----

export * from './basket/basket.actions';
export * from './basket/basket.selectors';
export * from './catalog/catalog.actions';
export * from './catalog/catalog.selectors';

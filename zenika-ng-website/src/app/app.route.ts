import { Routes } from '@angular/router';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';
import { catalogResolver } from './catalog/catalog.resolver';
import { basketGuard } from './basket/basket.guard';
import { productDetailsResolveMap } from './product-details/product-details.resolve';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./catalog/catalog.component').then((c) => c.CatalogComponent),
    resolve: { _: catalogResolver}
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket.component').then((c) => c.BasketComponent),
    canMatch: [basketGuard]
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket-empty/basket-empty.component').then((c) => c.BasketEmptyComponent),
  },
  {
    path: `products/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./product-details/product-details.component').then((c) => c.ProductDetailsComponent),
    resolve: productDetailsResolveMap,
  },
  {
    path: `**`,
    loadComponent: () => import('./not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];

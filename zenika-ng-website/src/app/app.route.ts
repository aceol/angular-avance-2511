import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';

export const appRoutes: Routes = [
  {
    path: '',
    component: CatalogComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: `products/:${PRODUCT_DETAILS_PARAM_KEY}`,
    component: ProductDetailsComponent,
  },
];

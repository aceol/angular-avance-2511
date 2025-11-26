import { ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { inject } from '@angular/core';
import { ProductDetailsResolveMap } from './product-details.type';

export const productDetailsResolveMap: ProductDetailsResolveMap = {
  product: ({ params }: ActivatedRouteSnapshot) => {
    return inject(ApiService).getProduct(params[PRODUCT_DETAILS_PARAM_KEY]);
  },
};

import { ResolveFn } from '@angular/router';
import { Product } from '../catalog/product/product.types';

export interface ProductDetailsComponentInputs {
  product: Product;
}

export interface ProductDetailsResolveMap {
  product: ResolveFn<Product>;
}

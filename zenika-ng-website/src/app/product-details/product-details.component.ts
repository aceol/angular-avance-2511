import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: false,
})
export class ProductDetailsComponent {
  protected product?: Product;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.apiService
      .getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY])
      .subscribe((product) => (this.product = product));
  }
}

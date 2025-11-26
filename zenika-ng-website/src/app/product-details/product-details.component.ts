import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../catalog/product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CurrencyPipe],
    standalone: true,
})
export class ProductDetailsComponent {
  protected product?: Product;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.apiService
      .getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY])
      .subscribe((product) => {
        this.product = product;
        changeDetectorRef.markForCheck();
      });
  }
}

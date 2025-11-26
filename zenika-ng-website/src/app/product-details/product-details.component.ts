import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../catalog/product/product.types';
import { CurrencyPipe } from '@angular/common';
import { ProductDetailsComponentInputs } from './product-details.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  standalone: true,
})
export class ProductDetailsComponent implements ProductDetailsComponentInputs {
  @Input({ required: true }) product!: Product;
}

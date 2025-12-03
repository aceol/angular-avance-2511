import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductComponent } from './product.component';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  standalone: true,
  template: '{{ product.id }}',
  providers: [
    {
      provide: ProductComponent,
      useClass: MockProductComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();
}

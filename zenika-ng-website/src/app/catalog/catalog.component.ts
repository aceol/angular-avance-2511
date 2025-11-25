import { Component, Inject } from '@angular/core';
import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: false,
})
export class CatalogComponent {
  protected products: Product[] = [];

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

  private basketItems: BasketItem[] = [];

  protected get basketTotal(): number {
    return this.basketItems.reduce((total: number, { price }) => total + price, 0);
  }

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
  ) {
    this.apiService.getProducts().subscribe((products) => (this.products = products));
    this.apiService.getBasket().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected addToBasket(product: Product): void {
    this.apiService.addToBasket(product.id).subscribe((basketItem) => {
      this.basketItems.push(basketItem);
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }
}

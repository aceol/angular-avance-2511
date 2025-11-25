import { Component, inject, Inject, OnInit } from '@angular/core';
import { Product } from './product/product.types';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';
import { WELCOME_MSG } from '../app.token';
import { zip } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: false,
})
export class CatalogComponent implements OnInit{
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);
  protected welcomeMsg = inject(WELCOME_MSG);

  protected get isStockEmpty(): boolean {
    return this.catalogService.isStockEmpty;
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected get products(): Product[] {
    return this.catalogService.products;
  }

  ngOnInit(): void {
    zip(
      [
      this.catalogService.fetch(),
      this.basketService.fetch()
    ]).subscribe();
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    this.catalogService.decreaseStock(product.id);
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}

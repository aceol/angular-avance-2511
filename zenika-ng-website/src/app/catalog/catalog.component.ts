import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { Product } from './product/product.types';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';
import { WELCOME_MSG } from '../app.token';
import { Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { RouterLink } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        ProductComponent,
        AsyncPipe,
        CurrencyPipe,
    ],
    standalone: true,
})
export class CatalogComponent{
  #catalogService = inject(CatalogService);
  #basketService = inject(BasketService);
  #alertService = inject(AlertService);
  protected welcomeMsg = inject(WELCOME_MSG);

  protected get isStockEmpty$(): Observable<boolean> {
    return this.#catalogService.isStockEmpty$;
  }

  protected get basketTotal$(): Observable<number> {
    return this.#basketService.total$;
  }

  protected get products$(): Observable<Product[]> {
    return this.#catalogService.products$;
  }

  protected addToBasket(product: Product): void {
    this.#basketService.addItem(product.id).subscribe({
      next: () => {
        this.#alertService.addSuccess('✅ Produit ajouté au catalogue');
        this.#catalogService.decreaseStock(product.id);
      },
      error: () => this.#alertService.addDanger("😱 Désolé, une erreur s'est produite."),
    });
  }

  private decreaseStock(product: Product): void {
    this.#catalogService.decreaseStock(product.id);
  }

  protected isAvailable(product: Product): boolean {
    return this.#catalogService.isAvailable(product);
  }
}

import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { Product } from './product/product.types';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';
import { WELCOME_MSG } from '../app.token';
import { catchError, EMPTY, Observable, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit{
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

  ngOnInit(): void {
    zip(
      [
      this.#catalogService.fetch(),
      this.#basketService.fetch()
    ]).pipe(
        catchError(() => {
          this.#alertService.addDanger("😲 Désolé, impossible d'accéder au catalogue.");
          return EMPTY;
        }),
    ).subscribe();
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

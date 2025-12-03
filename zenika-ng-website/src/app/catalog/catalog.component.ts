import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Product } from './product/product.types';
import { WELCOME_MSG } from '../app.token';
import { AlertService } from '../alert/alert.service';
import { RouterLink } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { basketActions, selectBasket, selectCatalog } from '../shared/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ProductComponent, AsyncPipe, CurrencyPipe],
    standalone: true,
})
export class CatalogComponent {
    #alertService = inject(AlertService);
    protected welcomeMsg = inject(WELCOME_MSG);
    #store = inject(Store);
    #actions$ = inject(Actions);

    protected basketTotal$ = this.#store.select(selectBasket.total);

    protected products$ = this.#store.select(selectCatalog.products);

    protected isStockEmpty$ = this.#store.select(selectCatalog.isStockEmpty);

    constructor() {
        this.#actions$
            .pipe(ofType(basketActions.addItemFailure), takeUntilDestroyed())
            .subscribe(() =>
                this.#alertService.addDanger(
                    "😱 Désolé, impossible d'ajouter au panier."
                )
            );
    }

    protected isAvailable(product: Product) {
        return product.stock > 0;
    }

    protected addToBasket(product: Product): void {
        this.#store.dispatch(basketActions.addItem({ productId: product.id }));
    }
}

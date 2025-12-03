import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBasket } from '../shared/store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, AsyncPipe],
})
export class MenuComponent {
    protected numberOfBasketItems$ = inject(Store).select(
        selectBasket.numberOfItems
    );
}

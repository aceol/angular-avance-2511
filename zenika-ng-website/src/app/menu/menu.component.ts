import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
})
export class MenuComponent {
  #basketService = inject(BasketService);

  protected get numberOfBasketItems$(): Observable<number> {
    return this.#basketService.numberOfItems$;
  }
}

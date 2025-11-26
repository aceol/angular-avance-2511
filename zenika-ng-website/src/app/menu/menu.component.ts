import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, AsyncPipe],
    standalone: true,
})
export class MenuComponent {
  private basketService = inject(BasketService);
  
  protected get numberOfBasketItems$(): Observable<Number> {
    return this.basketService.numberOfItems$;
  }

}

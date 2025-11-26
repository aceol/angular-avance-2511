import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private basketService = inject(BasketService);
  
  protected get numberOfBasketItems$(): Observable<Number> {
    return this.basketService.numberOfItems$;
  }

}

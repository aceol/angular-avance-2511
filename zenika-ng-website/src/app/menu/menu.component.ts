import { Component, inject } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: false,
})
export class MenuComponent {
  private basketService = inject(BasketService);
  
  protected get numberOfBasketItems() {
    return this.basketService.numberOfItems;
  }

}

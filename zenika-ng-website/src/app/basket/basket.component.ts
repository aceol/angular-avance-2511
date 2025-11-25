import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone: false,
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  protected basketItems: BasketItem[] = [];

  protected get basketTotal(): number {
    return this.basketItems.reduce((total, { price }) => total + price, 0);
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.apiService.getBasket().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.apiService.checkoutBasket(this.customer).subscribe(() => {
      this.basketItems = [];
      this.router.navigate(['']);
    });
  }
}

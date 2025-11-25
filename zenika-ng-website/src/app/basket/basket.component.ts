import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone: false,
})
export class BasketComponent implements OnDestroy{

  private basketService = inject(BasketService);
  
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  protected get basketItems() {
    return this.basketService.items;
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }


  private serviceSubscribe;

  constructor(
    private router: Router,
  ) {
    this.serviceSubscribe = this.basketService.fetch().subscribe();
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}

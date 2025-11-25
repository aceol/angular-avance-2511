import { inject, Injectable } from '@angular/core';
import { Product } from './product/product.types';
import { ApiService } from '../shared/services/api.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  products: Product[] = [];

  private apiService = inject(ApiService);
  
  get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

  fetch(): Observable<Product[]> {
      return this.apiService.getProducts().pipe(
          tap((items) => (this.products = items)),
          catchError(e => {
              console.error(e); 
              return EMPTY;
          })
      );
    }

  decreaseStock(productId: String): void {
    this.products = this.products.map((product) => {
      if(product.id == productId){
        return {...product, stock: product.stock - 1};
      }
      return product;
    });
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

}

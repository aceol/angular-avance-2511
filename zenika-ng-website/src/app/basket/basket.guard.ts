import { inject } from '@angular/core';
import { BasketService } from './basket.service';
import { map } from 'rxjs';

export const basketGuard = () => {
  return inject(BasketService)
    .fetch()
    .pipe(map((items) => items.length > 0));
};

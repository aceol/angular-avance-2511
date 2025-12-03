import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, map, race, switchMap } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { basketActions } from '../shared/store';

export const basketGuard = () => {
  inject(Store).dispatch(basketActions.fetch());

  const alertService = inject(AlertService);

  const fetchSuccess$ = inject(Actions)
      .pipe(ofType(basketActions.fetchSuccess))
      .pipe(map(({ items: basket }) => basket.length > 0));

  const fetchError$ = inject(Actions)
      .pipe(ofType(basketActions.fetchFailure))
      .pipe(
          switchMap(() => {
              alertService.addDanger(
                  "😖 Désolé, impossible d'accéder au panier."
              );
              return EMPTY;
          })
      );

  return race(fetchSuccess$, fetchError$);
};

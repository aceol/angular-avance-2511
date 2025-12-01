import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { basketActions } from '../basket/basket.actions';
import { catalogActions } from './catalog.actions';

export const catalogEffects = {
    fetch$: createEffect(
        () => {
            const apiService = inject(ApiService);

            return inject(Actions).pipe(
                ofType(catalogActions.fetch),
                exhaustMap(() =>
                    apiService.getProducts().pipe(
                        map((products) =>
                            catalogActions.fetchSuccess({ products })
                        ),
                        catchError(() => of(catalogActions.fetchFailure()))
                    )
                )
            );
        },
        { functional: true }
    ),

    decreaseStock$: createEffect(
        () => {
            return inject(Actions).pipe(
                ofType(basketActions.addItemSuccess),
                map(({ productId }) =>
                    catalogActions.decreaseStock({ productId })
                ),
                catchError(() => EMPTY)
            );
        },
        { functional: true }
    ),
};

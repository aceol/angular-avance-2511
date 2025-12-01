import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
    catchError,
    exhaustMap,
    filter,
    map,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { Customer } from '../../../customer/customer.types';
import { ApiService } from '../../services/api.service';
import { basketActions } from './basket.actions';
import { selectBasket } from './basket.selectors';

export const basketEffects = {
    fetch$: createEffect(
        () => {
            const apiService = inject(ApiService);

            return inject(Actions).pipe(
                ofType(basketActions.fetch),
                exhaustMap(() =>
                    apiService.getBasket().pipe(
                        map((items) => basketActions.fetchSuccess({ items })),
                        catchError(() => of(basketActions.fetchFailure()))
                    )
                )
            );
        },
        { functional: true }
    ),

    addItem$: createEffect(
        () => {
            const apiService = inject(ApiService);

            return inject(Actions).pipe(
                ofType(basketActions.addItem),
                exhaustMap(({ productId }) => {
                    return apiService.addToBasket(productId).pipe(
                        map((basketItem) =>
                            basketActions.addItemSuccess({
                                basketItem,
                                productId,
                            })
                        ),
                        catchError(() => of(basketActions.addItemFailure()))
                    );
                })
            );
        },
        { functional: true }
    ),

    checkout$: createEffect(
        () => {
            const store = inject(Store);
            const apiService = inject(ApiService);

            return inject(Actions).pipe(
                ofType(basketActions.checkout),
                withLatestFrom(store.select(selectBasket.customer)),
                map(([, customer]) => customer),
                filter(
                    (customer): customer is Customer => customer !== undefined
                ),
                exhaustMap((customer) => {
                    return apiService.checkoutBasket(customer).pipe(
                        map((order) => basketActions.checkoutSuccess(order)),
                        catchError(() => of(basketActions.checkoutFailure()))
                    );
                })
            );
        },
        { functional: true }
    ),
};

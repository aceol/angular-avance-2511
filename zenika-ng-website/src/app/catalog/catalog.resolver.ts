import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, race, switchMap, tap, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { basketActions, catalogActions } from '../shared/store';

export const catalogResolver = () => {
    const store = inject(Store);
    store.dispatch(catalogActions.fetch());
    store.dispatch(basketActions.fetch());

    const actions$ = inject(Actions);

    const alertService = inject(AlertService);

    const fetchSuccess$ = zip([
        actions$.pipe(ofType(catalogActions.fetchSuccess)),
        actions$.pipe(ofType(basketActions.fetchSuccess)),
    ]);

    const fetchError$ = race([
        actions$.pipe(ofType(catalogActions.fetchFailure)),
        actions$.pipe(ofType(basketActions.fetchFailure)),
    ]).pipe(
        tap(() =>
            alertService.addDanger(
                "😲 Désolé, impossible d'accéder au catalogue."
            )
        ),
        switchMap(() => EMPTY)
    );

    return race(fetchSuccess$, fetchError$);
};

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Customer } from '../../customer/customer.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { basketActions, selectBasket } from '../../shared/store';
import { Actions, ofType } from '@ngrx/effects';

@Component({
    selector: 'app-basket-form',
    imports: [ReactiveFormsModule],
    templateUrl: './basket-form.component.html',
    styleUrl: './basket-form.component.scss',
})
export class BasketFormComponent {
    #formBuilder = inject(FormBuilder);
    #alertService = inject(AlertService);
    #router = inject(Router);
    #store = inject(Store);
    #actions$ = inject(Actions);
    #changeDetectorRef = inject(ChangeDetectorRef);

    protected formGroup = this.#formBuilder.group({
        name: this.#formBuilder.nonNullable.control('', [Validators.required]),
        address: this.#formBuilder.nonNullable.control('', [
            Validators.required,
        ]),
        creditCard: this.#formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.pattern(/^\d{3}-\d{3}$/),
        ]),
    });

    constructor() {
        this.#actions$
            .pipe(ofType(basketActions.checkoutSuccess), takeUntilDestroyed())
            .subscribe(({ orderNumber }) => {
                this.#alertService.addSuccess(
                    `🚀 Merci pour votre commande (réf. ${orderNumber}).`
                );
                this.#router.navigate(['']);
            });

        this.#actions$
            .pipe(ofType(basketActions.checkoutFailure), takeUntilDestroyed())
            .subscribe(() => {
                this.#alertService.addDanger(
                    '😱 Désolé, impossible de valider votre commande.'
                );
                this.formGroup.enable();
                this.#changeDetectorRef.markForCheck();
            });

        this.#store
            .select(selectBasket.customer)
            .pipe(
                first(),
                filter(
                    (customer): customer is Customer => customer !== undefined
                )
            )
            .subscribe((customer) => {
                this.formGroup.setValue(customer);
                this.formGroup.updateValueAndValidity();
            });
    }

    protected checkout(event: Event): void {
        this.formGroup.disable();
        this.#store.dispatch(
            basketActions.fillCustomer({
                customer: this.formGroup.value as Customer,
            })
        );
        this.#store.dispatch(basketActions.checkout());
    }
}

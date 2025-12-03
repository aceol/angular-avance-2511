import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { BasketService } from '../basket.service';
import { Customer } from '../../customer/customer.types';

@Component({
  selector: 'app-basket-form',
  imports: [ReactiveFormsModule],
  templateUrl: './basket-form.component.html',
  styleUrl: './basket-form.component.scss',
})
export class BasketFormComponent {
  #formBuilder = inject(FormBuilder);
  #basketService = inject(BasketService);
  #alertService = inject(AlertService);
  #router = inject(Router);

  protected formGroup = this.#formBuilder.group({
    name: this.#formBuilder.nonNullable.control('', [Validators.required]),
    address: this.#formBuilder.nonNullable.control('', [Validators.required]),
    creditCard: this.#formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d{3}-\d{3}$/),
    ]),
  });

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.formGroup.disable();

    this.#basketService.checkout(this.formGroup.value as Customer).subscribe({
      next: ({ orderNumber }) => {
        this.#alertService.addSuccess(
          `🚀 Merci pour votre commande (réf. ${orderNumber}).`,
        );
        this.formGroup.enable();
        this.#router.navigate(['']);
      },
      error: () => {
        this.formGroup.enable();
        this.#alertService.addDanger("😱 Désolé, une erreur s'est produite.");
      },
    });
  }
}

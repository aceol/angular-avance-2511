import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Alert } from './alert.types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly delay = 3000;

  #alerts$ = new BehaviorSubject<Alert[]>([]);

  alerts$ = this.#alerts$.asObservable();

  addSuccess(content: string) {
    this.#add({ type: 'success', content });
  }

  addDanger(content: string) {
    this.#add({ type: 'danger', content });
  }

  #add(alert: Alert): void {
    this.#alerts$.next([alert, ...this.#alerts$.value]);
    this.#scheduleRemoval();
  }

  #scheduleRemoval() {
    setTimeout(() => {
      const alerts = [...this.#alerts$.value];
      alerts.pop();
      this.#alerts$.next(alerts);
    }, this.delay);
  }
}
